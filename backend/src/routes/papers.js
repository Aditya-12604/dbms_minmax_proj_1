const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const AWS_REGION = process.env.AWS_REGION;
let s3Client = null;
if (S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({ region: AWS_REGION });
} else {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Allow only pdf, md, txt
const allowedExtensions = new Set(['.pdf', '.md', '.txt']);

// Use memory storage when uploading to S3, otherwise disk storage
const storage = s3Client ? multer.memoryStorage() : multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null, name);
  }
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.has(ext)) {
    return cb(new Error('Only .pdf, .md and .txt files are allowed'));
  }
  // Basic mime-type check (not foolproof) — more thorough validation can be added
  if (!/pdf|plain|markdown/.test(file.mimetype)) {
    // allow common markdown/text mimetypes too
    // still permit since extension check is primary here
  }
  cb(null, true);
}

const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024;
const upload = multer({ storage, fileFilter, limits: { fileSize: maxFileSize } });

// GET /api/papers?search=&dept=&limit=&offset=
router.get('/', async (req, res) => {
  const { search = '', dept, limit = 20, offset = 0 } = req.query;
  try {
    let base = `SELECT p.*, coalesce(u.full_name, 'Unknown') as author_name, d.name as dept_name,
      (SELECT COALESCE(SUM(vote_value),0) FROM votes v WHERE v.paper_id = p.id) as votes
      FROM papers p
      LEFT JOIN profiles u ON u.id = p.author_id
      LEFT JOIN departments d ON d.id = p.dept_id`;
    const where = [];
    const params = [];
    if (dept) {
      params.push(dept);
      where.push(`p.dept_id = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      where.push(`(p.title ILIKE $${params.length} OR p.abstract ILIKE $${params.length} OR p.raw_content ILIKE $${params.length})`);
    }
    if (where.length) base += ' WHERE ' + where.join(' AND ');
    params.push(limit);
    params.push(offset);
    base += ` ORDER BY p.created_at DESC LIMIT $${params.length-1} OFFSET $${params.length}`;

    const result = await db.query(base, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
});

// GET /api/papers/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const q = `SELECT p.*, u.full_name as author_name, d.name as dept_name,
      (SELECT COALESCE(SUM(vote_value),0) FROM votes v WHERE v.paper_id = p.id) as votes
      FROM papers p
      LEFT JOIN profiles u ON u.id = p.author_id
      LEFT JOIN departments d ON d.id = p.dept_id
      WHERE p.id = $1`;
    const result = await db.query(q, [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch paper' });
  }
});

// POST /api/papers (multipart)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, abstract, author_id, dept_id } = req.body;
    let content_url = null;
    let file_type = null;
    let raw_content = null;

    if (req.file) {
      file_type = path.extname(req.file.originalname).slice(1).toLowerCase();
      if (s3Client) {
        // upload buffer to s3
        const key = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${path.extname(req.file.originalname).toLowerCase()}`;
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ACL: 'private'
        };
        await s3Client.send(new PutObjectCommand(params));
        // construct a URL users can use to download (assumes standard s3 URL pattern)
        content_url = AWS_REGION ? `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}` : `https://${S3_BUCKET}.s3.amazonaws.com/${key}`;
        if (file_type === 'md' || file_type === 'txt') {
          raw_content = req.file.buffer.toString('utf8').slice(0, 200000);
        }
      } else {
        content_url = `${req.file.filename}`;
        if (file_type === 'md' || file_type === 'txt') {
          // read file content into raw_content for searching (careful with large files)
          raw_content = fs.readFileSync(path.join(UPLOAD_DIR, req.file.filename), 'utf8').slice(0, 200000);
        }
      }
    }

    const insertQ = `INSERT INTO papers (title, abstract, content_url, file_type, raw_content, author_id, dept_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const params = [title, abstract || null, content_url, file_type, raw_content, author_id || null, dept_id || null];
    const result = await db.query(insertQ, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to upload paper' });
  }
});

// GET comments
router.get('/:id/comments', async (req, res) => {
  try {
    const q = `SELECT c.*, u.full_name as user_name FROM comments c LEFT JOIN profiles u ON u.id = c.user_id WHERE c.paper_id = $1 ORDER BY c.created_at ASC`;
    const result = await db.query(q, [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST comment
router.post('/:id/comments', async (req, res) => {
  try {
    const paperId = req.params.id;
    const { user_id, content } = req.body;
    if (!user_id || !content) return res.status(400).json({ error: 'user_id and content required' });
    const q = `INSERT INTO comments (content, user_id, paper_id) VALUES ($1,$2,$3) RETURNING *`;
    const result = await db.query(q, [content, user_id, paperId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// POST vote
router.post('/:id/vote', async (req, res) => {
  try {
    const paperId = req.params.id;

      const { user_id, vote_value } = req.body;
      if (!user_id || typeof vote_value === 'undefined' || isNaN(Number(vote_value))) {
        return res.status(400).json({ error: 'user_id and vote_value required' });
      }
      const v = Number(vote_value);
      if (![1, -1, 0].includes(v)) return res.status(400).json({ error: 'vote_value must be 1, -1, or 0' });

      if (v === 0) {
        // remove existing vote to represent neutral
        await db.query('DELETE FROM votes WHERE user_id = $1 AND paper_id = $2', [user_id, paperId]);
      } else {
        // Upsert vote
        const upsert = `INSERT INTO votes (user_id, paper_id, vote_value) VALUES ($1,$2,$3)
          ON CONFLICT (user_id, paper_id) DO UPDATE SET vote_value = EXCLUDED.vote_value`;
        await db.query(upsert, [user_id, paperId, v]);
      }

    const sumQ = `SELECT COALESCE(SUM(vote_value),0) as votes FROM votes WHERE paper_id = $1`;
    const sumRes = await db.query(sumQ, [paperId]);
    res.json({ votes: sumRes.rows[0].votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register vote' });
  }
});

module.exports = router;

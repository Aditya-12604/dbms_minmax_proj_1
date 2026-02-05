// Mock data for the application
export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  imageUrl: string;
  contact: string;
  established: string;
}

export interface Job {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  description: string;
  skills: string[];
  budget: string;
  deadline: string;
  postedDate: string;
  status: "open" | "in-progress" | "closed";
  applicants: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  clubName: string;
  appliedDate: string;
  status: "pending" | "accepted" | "rejected";
  proposal: string;
}

export const mockClubs: Club[] = [
  {
    id: "1",
    name: "Technovanza",
    category: "Technology",
    description:
      "VJTI's Flagship TechFest.",
    memberCount: 145,
    imageUrl: "technology-innovation",
    contact: "tech.club@college.edu",
    established: "2020",
  },
  {
    id: "2",
    name: "Design Collective",
    category: "Pratibimb",
    description:
      "Creating visual experiences and fostering creative collaboration.",
    memberCount: 89,
    imageUrl: "graphic-design-creative",
    contact: "design@college.edu",
    established: "2019",
  },
  {
    id: "3",
    name: "Entrepreneurship Cell",
    category: "Business",
    description:
      "Connecting students with entrepreneurship and business opportunities.",
    memberCount: 210,
    imageUrl: "business-meeting-team",
    contact: "business@college.edu",
    established: "2018",
  },
  {
    id: "4",
    name: "Society of Robotics & Automation",
    category: "Technology",
    description:
      "Designing and building autonomous robots for competitions.",
    memberCount: 52,
    imageUrl: "robot-technology",
    contact: "robotics@college.edu",
    established: "2017",
  },
  {
    id: "5",
    name: "Debate & Literary Arts Society",
    category: "Arts",
    description:
      "Producing theatrical performances and developing acting skills.",
    memberCount: 78,
    imageUrl: "theater-stage-performance",
    contact: "drama@college.edu",
    established: "2016",
  },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Website Developer for Annual Tech Fest",
    clubId: "1",
    clubName: "Technovanza",
    description:
      "We need a skilled web developer to create a responsive website for our annual tech fest. The site should include registration forms, event schedules, and sponsor information.",
    skills: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
    budget: "$200 - $350",
    deadline: "2026-03-15",
    postedDate: "2026-02-01",
    status: "open",
    applicants: 5,
  },
  {
    id: "2",
    title: "Logo Design for Club Rebranding",
    clubId: "2",
    clubName: "Pratibimb",
    description:
      "Looking for a creative designer to redesign our club logo. Should be modern, versatile, and represent creativity and collaboration.",
    skills: [
      "Adobe Illustrator",
      "Branding",
      "Typography",
      "Color Theory",
    ],
    budget: "$100 - $150",
    deadline: "2026-02-28",
    postedDate: "2026-01-28",
    status: "open",
    applicants: 8,
  },
  {
    id: "3",
    title: "Social Media Manager",
    clubId: "3",
    clubName: "Entrepreneurship Cell",
    description:
      "Need someone to manage our social media presence across Instagram, LinkedIn, and Twitter. Create engaging content and grow our audience.",
    skills: [
      "Social Media Marketing",
      "Content Creation",
      "Canva",
      "Analytics",
    ],
    budget: "$150 - $250/month",
    deadline: "2026-02-20",
    postedDate: "2026-02-02",
    status: "open",
    applicants: 12,
  },
  {
    id: "4",
    title: "Arduino Programmer",
    clubId: "4",
    clubName: "Society of Robotics & Automation",
    description:
      "We need help programming Arduino-based sensors for our competition robot. Experience with servo motors and sensor integration required.",
    skills: ["Arduino", "C++", "Electronics", "Robotics"],
    budget: "$250 - $400",
    deadline: "2026-02-25",
    postedDate: "2026-02-03",
    status: "open",
    applicants: 4,
  },
  {
    id: "5",
    title: "Script Writer for Spring Play",
    clubId: "5",
    clubName: "Debate & Literary Arts Society",
    description:
      "Looking for a creative writer to adapt a classic story into a 45-minute play suitable for college audience.",
    skills: [
      "Creative Writing",
      "Scriptwriting",
      "Drama",
      "Storytelling",
    ],
    budget: "$120 - $200",
    deadline: "2026-03-05",
    postedDate: "2026-01-29",
    status: "open",
    applicants: 6,
  },
];

export const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "Website Developer for Annual Tech Fest",
    clubName: "Technovanza",
    appliedDate: "2026-02-03",
    status: "pending",
    proposal:
      "I have 2 years of experience with React and have built several event websites...",
  },
  {
    id: "2",
    jobId: "3",
    jobTitle: "Social Media Manager",
    clubName: "Business Society",
    appliedDate: "2026-02-04",
    status: "accepted",
    proposal:
      "I managed social media for two student organizations and grew their following by 300%...",
  },
];
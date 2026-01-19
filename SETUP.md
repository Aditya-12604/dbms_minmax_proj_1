# University Management System - Setup Guide

This guide provides the step-by-step instructions to initialize the PostgreSQL database and run the PyQt6 GUI application.

## 1. Install PostgreSQL
Ensure the PostgreSQL server and client tools are installed.

```bash
# Update package lists
sudo apt update

# Install PostgreSQL and contrib modules
sudo apt install postgresql postgresql-contrib


sudo service postgresql start

sudo -iu postgres

# Execute commands

-- Create the project user
CREATE USER vjti WITH PASSWORD 'yourpassword';

-- Create the database
CREATE DATABASE mad OWNER vjti;

-- Grant permissions
ALTER USER vjti WITH SUPERUSER;

-- Exit
\q

By default, Postgres matches your Linux username to your DB username. We need to switch this to password-based authentication (md5).

    Locate your config file:
    Bash

    sudo -u postgres psql -c "SHOW hba_file;"

    Open the file (replace VERSION with your installed version, e.g., 14, 15, or 16):
    Bash

    sudo nano /etc/postgresql/VERSION/main/pg_hba.conf

    Edit the file: Find the line for local all all and change peer to md5:
    Plaintext

    # TYPE  DATABASE        USER            ADDRESS                 METHOD
    local   all             all                                     md5

    Restart PostgreSQL to apply changes:
    Bash

    sudo service postgresql restart


4. Execute the SQL Script

Move your init_db.sql to a readable directory and run it to create the 3NF tables.

    Move script to /tmp (avoids permission denied errors):
    Bash

    cp ~/path/to/your/init_db.sql /tmp/

    Run the script:
    Bash

    psql -U vjti -d mad -h localhost -f /tmp/init_db.sql

    (Enter 'yourpassword' when prompted)

5. Python Environment Setup

Prepare your Python environment with the necessary drivers and GUI libraries.

    Create a Virtual Environment:
    Bash

    python3 -m venv venv
    source venv/bin/activate

    Install Dependencies:
    Bash

    pip install psycopg2-binary PyQt6

6. Running the Application

Ensure your main.py has the correct DB_PARAMS:

    Host: localhost

    Database: mad

    User: vjti

    Password: yourpassword

Execute the app:
Bash

python3 main.py

User Credentials for Testing
Role	Username	Password
Admin	admin	admin123
Professor	prof_turing	pass123
Student	student_alice	pass123
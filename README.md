## Local WordPress Docker Environment

This directory contains a basic Docker setup for running a fresh WordPress installation.

### Files

- `docker-compose.yml` – Defines the WordPress and MySQL containers.
- `.env.example` – Example of environment variables used by the stack. You can copy this to `.env` and customize values.

### Getting started

1. **Create your `.env` file**:

   ```bash
   cp .env.example .env
   # Optionally edit .env to change database name, user, or passwords
   ```

2. **Start the stack** (from this `vm` directory):

   ```bash
   colima start
   docker compose up -d
   ```

3. **Complete the WordPress installation**:

- Open `http://localhost:8000` in your browser.
- Follow the on-screen steps to choose language, site title, and admin credentials.

### Data persistence

- Database data is stored in the named volume `db_data`.
- WordPress files are stored in the named volume `wp_data`.
- If you want the `wp-content` folder on your host machine for easier development, uncomment the `./wp-content` bind mount in `docker-compose.yml` and create a `wp-content` directory here.


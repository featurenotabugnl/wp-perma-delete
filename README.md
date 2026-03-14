## Local WordPress Docker Environment

This directory contains a basic Docker setup for running a fresh WordPress installation.

### Files

- `docker-compose.yml` – Defines the WordPress and MySQL containers.
- `.env.example` – Example of environment variables used by the stack. You can copy this to `.env` and customize values.
- `maybe-perma-delete/` – WordPress plugin that modifies delete behavior in the admin.

### Getting started

1. **Create your `.env` file**:

   ```bash
   cp .env.example .env
   # Optionally edit .env to change database name, user, or passwords
   ```

2. **Start the stack** (from this `dev` directory):

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

### WP Perma Delete plugin

The `wp-perma-delete` plugin enhances the WordPress admin delete behavior:

- **Alt-hover link in post tables**: Holding the Alt key while hovering over the trash action will swap it to a **Delete permanently** action for that row.
- **Alt-hover link on the post edit screen**: Holding Alt over the **Move to Trash** link will turn it into a **Delete permanently** action.
- **Bulk actions**: The bulk actions dropdowns always include a **Delete permanently** option alongside the default trash behavior.

All strings are translatable using the `maybe-perma-delete` textdomain, and the PHP code follows the WordPress coding standards.


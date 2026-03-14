---
name: Maybe Perma Delete rebrand
overview: Rebrand the plugin from "WP Perma Delete" to "Maybe Perma Delete" across display names, slugs, PHP constants, JS globals/namespaces, and file/directory names, in all relevant files.
todos: []
isProject: false
---

# Rebrand to "Maybe Perma Delete"

## Naming convention

Apply these type-cases consistently:

- **Display / title**: Maybe Perma Delete
- **Slug** (plugin dir, script handle, URLs): `maybe-perma-delete`
- **PHP constants**: `MAYBE_PERMA_DELETE_`* (e.g. `MAYBE_PERMA_DELETE_PLUGIN_SLUG`)
- **PHP package**: `Maybe_Perma_Delete`
- **JS global** (localized object): `maybe_perma_delete`
- **jQuery event namespace**: `.maybe_perma_delete`

Internal JS function names (`compile_perma_delete_url`, `add_bulk_perma_delete_option`, etc.) describe the feature, not the product; they can stay as-is. Only plugin-identifying symbols (slug, constants, global, namespace) are changed.

---

## 1. Rename plugin directory and script file

- Rename folder `**wp-perma-delete/`** → `**maybe-perma-delete/`** (WordPress plugin slug = directory name).
- Inside the plugin folder, rename `**wp-perma-delete.js`** → `**maybe-perma-delete.js`**.

All references to these paths and the script filename must be updated in the files below.

---

## 2. Plugin core files

### [wp-perma-delete/index.php](wp-perma-delete/index.php) (will live at `maybe-perma-delete/index.php` after rename)

- **Plugin header**: `Plugin Name: WP Perma Delete` → `Plugin Name: Maybe Perma Delete`; `Plugin URI`: `.../wp-perma-delete` → `.../maybe-perma-delete`.
- **@package**: `WP_Perma_Delete` → `Maybe_Perma_Delete`.
- **License block** (lines 16–28): replace "WP Perma Delete" with "Maybe Perma Delete" (2 occurrences).
- **Constants**:
  - `WP_PERMA_DELETE_`* → `MAYBE_PERMA_DELETE_`* (all four: `PLUGIN_SLUG`, `PLUGIN_SLUG_`, `VERSION`, `SCRIPT_URL`).
  - Slug values: `'wp-perma-delete'` → `'maybe-perma-delete'`, `'wp_perma_delete'` → `'maybe_perma_delete'`.
  - Script URL: `'wp-perma-delete.js'` → `'maybe-perma-delete.js'`.
- **Usage sites**: replace `WP_PERMA_DELETE_PLUGIN_SLUG`, `WP_PERMA_DELETE_SCRIPT_URL`, `WP_PERMA_DELETE_VERSION`, `WP_PERMA_DELETE_PLUGIN_SLUG_` with the new constant names (in `wp_enqueue_script` and `wp_localize_script`).

### [wp-perma-delete/wp-perma-delete.js](wp-perma-delete/wp-perma-delete.js) (will become `maybe-perma-delete/maybe-perma-delete.js`)

- **Global comment**: `wp_perma_delete` → `maybe_perma_delete`.
- **All references** to the localized object: `wp_perma_delete` → `maybe_perma_delete` (e.g. `wp_perma_delete.perma_delete_label` → `maybe_perma_delete.perma_delete_label`).
- **jQuery event namespaces**: `.wp_perma_delete` → `.maybe_perma_delete` (in `off`, `on`, `keydown`, `keyup`).

---

## 3. Documentation and project config

### [wp-perma-delete/readme.txt](wp-perma-delete/readme.txt)

- Title: `=== WP Perma Delete ===` → `=== Maybe Perma Delete ===`.
- Body: "**WP Perma Delete**" → "**Maybe Perma Delete**" (2 places); "`wp-perma-delete` folder" → "`maybe-perma-delete` folder".

### [README.md](README.md)

- Replace "WP Perma Delete" with "Maybe Perma Delete" and "wp-perma-delete" with "maybe-perma-delete" in plugin description and textdomain mention.

### [dev-plan.md](dev-plan.md)

- Update folder name "wp-perma-delete" → "maybe-perma-delete" and script name "wp-perma-delete.js" → "maybe-perma-delete.js".

### [docker-compose.yml](docker-compose.yml)

- Volume mount: `./wp-perma-delete` → `./maybe-perma-delete` and `.../plugins/wp-perma-delete` → `.../plugins/maybe-perma-delete`.
- Comment: "wp-perma-delete" → "maybe-perma-delete".

### [.cursor/plans/wp-perma-delete-plugin_a04655c6.plan.md](.cursor/plans/wp-perma-delete-plugin_a04655c6.plan.md)

- Update plan name, overview, and all references from "wp-perma-delete" to "maybe-perma-delete" (and "WP Perma Delete" to "Maybe Perma Delete" where it appears) so the plan doc stays consistent with the codebase. File path links should point to `maybe-perma-delete/` and `maybe-perma-delete.js`.

---

## 4. Summary of files to change


| Location                                                | Action                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| `wp-perma-delete/` (directory)                          | Rename to `maybe-perma-delete/`                              |
| `wp-perma-delete/wp-perma-delete.js`                    | Rename to `maybe-perma-delete.js` (inside new dir)           |
| `maybe-perma-delete/index.php`                          | Headers, package, license, constants, slug/script values     |
| `maybe-perma-delete/maybe-perma-delete.js`              | Global, object refs, event namespaces                        |
| `maybe-perma-delete/readme.txt`                         | Title and body text                                          |
| `README.md`                                             | Plugin name and slug                                         |
| `dev-plan.md`                                           | Folder and script names                                      |
| `docker-compose.yml`                                    | Volume paths and comment                                     |
| `.cursor/plans/wp-perma-delete-plugin_a04655c6.plan.md` | Name/overview and all wp-perma-delete / WP Perma Delete refs |


**Not changed**: [wp-perma-delete/LICENSE.txt](wp-perma-delete/LICENSE.txt) is standard GPL text with no plugin name.

---

## Order of operations

1. Apply all **in-file edits** first (so content matches the new names).
2. **Rename** `wp-perma-delete.js` → `maybe-perma-delete.js` inside the plugin folder.
3. **Rename** the plugin directory `wp-perma-delete/` → `maybe-perma-delete/`.

This avoids broken references after the renames.
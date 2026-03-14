=== WP Perma Delete ===
Contributors: featurenotabug
Tags: delete, trash, bulk actions, posts, pages
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Hold the Alt (or Option) key to permanently delete posts, pages, and other content from WordPress, instead of moving them to the trash first.

== Description ==

It can be quite annoying when you want to delete a post but it only has a Trash link. You then need to go into the trash to delete it for real. This plugin allows you to delete a post permanently by turning the trash links into a permanent delete links when you hold down the alt/option key on your keyboard.

**WP Perma Delete** adds a convenient way to permanently delete content directly from the admin without the risk of pressing it accidentally:

- **Alt-hover in post tables**: Hold the Alt/Option key while hovering over the Trash action in post, page, or custom post type lists. The link will change to **Delete permanently** for that specific row.
- **Alt-hover on the post edit screen**: On the single post edit screen, hold Alt/Option while hovering over the **Move to Trash** link to turn it into **Delete permanently**.
- **Bulk actions**: The bulk actions dropdowns always include a **Delete permanently** option alongside the default Trash action.

== Installation ==

1. Upload the `wp-perma-delete` folder to the `/wp-content/plugins/` directory, or install the plugin via the WordPress Plugins screen.
2. Activate the plugin through the **Plugins** screen in WordPress.
3. Go to any posts, pages, or custom post type list, or open a single post edit screen, and use the Alt/Option key with the delete actions as described.

== Frequently Asked Questions ==

= Does this replace the default trash behavior? =

No. The default **Move to Trash** behavior remains available everywhere. WP Perma Delete only adds an additional way to permanently delete items when you explicitly choose it.

= Does this work with custom post types? =

Yes, the plugin hooks into the standard admin post list and edit screens, so any custom post type that appears there will inherit the same behavior.

= Can I recover items that I permanently delete? =

No. When you use **Delete permanently**, the content is hard-deleted from the database. Make sure you have backups if you need the ability to restore deleted content.

= Does this affect front-end behavior? =

No. The plugin only modifies admin-side delete options and JavaScript. It doesn’t change your front-end or theme output.

== Changelog ==

= 1.0.0 =
* Initial release with:
* Alt-hover delete behavior in post tables.
* Alt-hover delete behavior on the post edit screen.
* Bulk **Delete permanently** actions alongside default trash actions.
I'm creating a wordpress plugin (in the folder wp-perma-delete) that allows the user to replace the "Trash" link with a "Delete permanently" link when pressing the "alt" key. Normally you only see the delete permanently link when you disable the trash functionality on that post type.

So these are the features i have in mind:
- alt-hover-link in the post table (on all post types where trash is enabled)
- alt-hover-link on the post edit screen (on all post types where trash is enabled)
- Delete permanently should always be in the dropdown actions when bulk selecting posts.
- All strings translatable
- All code strictly written using the wordpress coding standards.

It should just use the files:
- index.php for php functions and hooks (file already exists)
- wp-perma-delete.js in the root of the plugin folder which is only enqueued for admin pages.

Make sure it works on windows + mac + linux.

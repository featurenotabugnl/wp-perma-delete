<?php
/**
 * Plugin Name: WP Perma Delete
 * Plugin URI: https://example.com/wp-perma-delete
 * Description: Permanently delete posts, pages, and other content from WordPress instead of moving them to the trash.
 * Version: 0.1.0
 * Author: featurenotabug.
 * Author URI: https://example.com
 * Text Domain: wp-perma-delete
 * Domain Path: /languages
 *
 * @package WP_Perma_Delete
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$plugin_data = get_file_data( __FILE__ );
define( 'WP_PERMA_DELETE_PLUGIN_SLUG', 'wp-perma-delete' );
define( 'WP_PERMA_DELETE_VERSION', $plugin_data['Version'] ?? null );
define( 'WP_PERMA_DELETE_TEXTDOMAIN', $plugin_data['Text Domain'] ?? WP_PERMA_DELETE_PLUGIN_SLUG;
define( 'WP_PERMA_DELETE_LANG_FOLDER', dirname( plugin_basename( __FILE__ ) ) . ( $plugin_data['Domain Path'] ?? '/languages' ) );
define( 'WP_PERMA_DELETE_SCRIPT_URL', plugin_dir_url( __FILE__ ) . 'wp-perma-delete.js' );

/**
 * Load plugin textdomain.
 *
 * @return void
 */
add_action( 'plugins_loaded', function() {
	load_plugin_textdomain( WP_PERMA_DELETE_TEXTDOMAIN, false, WP_PERMA_DELETE_LANG_FOLDER );
} );

/**
 * Enqueue admin script on relevant screens.
 *
 * @param string $hook_suffix Current admin page hook suffix.
 * @return void
 */
add_action( 'admin_enqueue_scripts', function( $hook_suffix ) {

	// Check for relevant admin pages.
	if ( ! in_array( $hook_suffix, array(
		'edit.php',    // Post table screens
		'post.php',    // Post edit screens
		'post-new.php' // New post screens
	) ) ) {
		return;
	}

	// Enqueue the script.
	wp_enqueue_script(
		WP_PERMA_DELETE_PLUGIN_SLUG,
		WP_PERMA_DELETE_SCRIPT_URL,
		array( 'jquery' ),
		WP_PERMA_DELETE_VERSION,
		true
	);

	// Pass variables to the script.
	wp_localize_script(
		WP_PERMA_DELETE_PLUGIN_SLUG,
		'wp_perma_delete',
		array(
			'perma_delete_label_singular' => _x( 'Delete permanently', 'Perma-delete label - singular', WP_PERMA_DELETE_TEXTDOMAIN ),
			'perma_delete_label_plural'   => _x( 'Delete permanently', 'Perma-delete label - plural', WP_PERMA_DELETE_TEXTDOMAIN ),
			'trash_label'                 => _x( 'Trash', 'Trash label', WP_PERMA_DELETE_TEXTDOMAIN ),
		)
	);

} );
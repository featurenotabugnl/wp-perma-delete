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

/**
 * Load plugin textdomain.
 *
 * @return void
 */
function wp_perma_delete_load_textdomain() {
	load_plugin_textdomain(
		'wp-perma-delete',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'wp_perma_delete_load_textdomain' );

/**
 * Enqueue admin script on relevant screens.
 *
 * @param string $hook_suffix Current admin page hook suffix.
 * @return void
 */
function wp_perma_delete_admin_enqueue_scripts( $hook_suffix ) {
	if ( 'edit.php' !== $hook_suffix && 'post.php' !== $hook_suffix && 'post-new.php' !== $hook_suffix ) {
		return;
	}

	$script_handle = 'wp-perma-delete';
	$script_path   = plugin_dir_path( __FILE__ ) . 'wp-perma-delete.js';
	$script_url    = plugin_dir_url( __FILE__ ) . 'wp-perma-delete.js';
	$version       = file_exists( $script_path ) ? filemtime( $script_path ) : '0.1.0';

	wp_enqueue_script(
		$script_handle,
		$script_url,
		array( 'jquery' ),
		$version,
		true
	);

	wp_localize_script(
		$script_handle,
		'wpPermaDelete',
		array(
			'altDeleteLabel'        => __( 'Delete permanently', 'wp-perma-delete' ),
			'trashLabel'            => __( 'Trash', 'wp-perma-delete' ),
			'altDeleteBulkLabel'    => __( 'Delete permanently', 'wp-perma-delete' ),
			'bulkDeleteOptionValue' => 'delete',
		)
	);
}
add_action( 'admin_enqueue_scripts', 'wp_perma_delete_admin_enqueue_scripts' );
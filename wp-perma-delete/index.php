<?php
/**
 * Plugin Name: WP Perma Delete
 * Plugin URI: https://featurenotabug.nl/wp-perma-delete
 * Description: Permanently delete posts, pages, and other content from WordPress instead of moving them to the trash.
 * Version: 1.0.0
 * Author: Berend de Jong @ featurenotabug.
 * Author URI: https://featurenotabug.nl
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package WP_Perma_Delete
 */

/*
WP Perma Delete is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

WP Perma Delete is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$plugin_data = get_file_data( __FILE__, array( 'Version' ) );
define( 'WP_PERMA_DELETE_PLUGIN_SLUG', 'wp-perma-delete' );
define( 'WP_PERMA_DELETE_PLUGIN_SLUG_', 'wp_perma_delete' );
define( 'WP_PERMA_DELETE_VERSION', $plugin_data['Version'] ?? null );
define( 'WP_PERMA_DELETE_SCRIPT_URL', plugin_dir_url( __FILE__ ) . 'wp-perma-delete.js' );

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
		WP_PERMA_DELETE_PLUGIN_SLUG_,
		array(
			'perma_delete_label' => __( 'Delete permanently', 'default' ),
		)
	);

} );
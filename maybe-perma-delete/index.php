<?php
/**
 * Plugin Name: Maybe Perma Delete
 * Plugin URI: https://featurenotabug.nl/maybe-perma-delete
 * Description: Hold alt to permanently delete posts, pages, and other content instead of moving them to the trash.
 * Version: 1.0.0
 * Author: Berend de Jong @ featurenotabug.
 * Author URI: https://featurenotabug.nl
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Maybe_Perma_Delete
 */

/*
Maybe Perma Delete is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

Maybe Perma Delete is distributed in the hope that it will be useful,
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
define( 'MAYBE_PERMA_DELETE_PLUGIN_SLUG', 'maybe-perma-delete' );
define( 'MAYBE_PERMA_DELETE_PLUGIN_SLUG_', 'maybe_perma_delete' );
define( 'MAYBE_PERMA_DELETE_VERSION', $plugin_data['Version'] ?? null );
define( 'MAYBE_PERMA_DELETE_SCRIPT_URL', plugin_dir_url( __FILE__ ) . 'maybe-perma-delete.js' );

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
		MAYBE_PERMA_DELETE_PLUGIN_SLUG,
		MAYBE_PERMA_DELETE_SCRIPT_URL,
		array( 'jquery' ),
		MAYBE_PERMA_DELETE_VERSION,
		true
	);

	// Pass variables to the script.
	wp_localize_script(
		MAYBE_PERMA_DELETE_PLUGIN_SLUG,
		MAYBE_PERMA_DELETE_PLUGIN_SLUG_,
		array(
			'perma_delete_label' => __( 'Delete permanently', 'default' ),
		)
	);

} );
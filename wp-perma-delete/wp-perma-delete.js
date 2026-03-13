/* global jQuery, wp_perma_delete */

( function( $ ) {

	'use strict';

	// Wether the alt-key (opt/alt key on mac) is currently pressed.
	var is_alt_pressed = false;

	/**
	 * Refresh the current link state (post table + edit screen).
	 *
	 * @returns {void}
	 */
	function refresh_current_state() {

		// Check each table row
		$( '#the-list tr' ).each( function() {
			var $row = $( this );
			if ( $row.is( ':hover' ) ) {
				toggle_row_actions( $row );
			}
		} );

		// The post edit screen
		toggle_edit_screen_link();

	}

	/**
	 * When alt/opt is pressed, swap the trash link with the perma-delete link.
	 *
	 * @param {KeyboardEvent} event Key event.
	 * @returns {void}
	 */
	function key_down( event ) {

		if ( event.altKey ) {
			is_alt_pressed = true;
			refresh_current_state();
		}

	}

	/**
	 * When alt/opt is released, restore the original trash link.
	 *
	 * @param {KeyboardEvent} event Key event.
	 * @returns {void}
	 */
	function key_up( event ) {

		if ( ! event.altKey ) {
			is_alt_pressed = false;
			refresh_current_state();
		}

	}

	/**
	 * Convert "trash" URL to "perma-delete" URL.
	 *
	 * @param {string} href Original href.
	 * @returns {string} Updated href (or original when unchanged).
	 */
	function compile_perma_delete_url( href ) {

		if ( ! href ) {
			return href;
		}

		if ( href.indexOf( 'action=trash' ) === -1 ) {
			return href;
		}

		return href.replace( 'action=trash', 'action=delete' );

	}

	/**
	 * Toggle table row's trash and perma-delete link.
	 *
	 * @param {jQuery} $row Row element.
	 * @returns {void}
	 */
	function toggle_row_actions( $row ) {

		var $trash_link = $row.find( '.row-actions .trash a' );

		if ( ! $trash_link.length ) {
			return;
		}

		// Save the original link/label
		if ( ! $trash_link.data( 'original_href' ) ) {
			$trash_link.data( 'original_href', $trash_link.attr( 'href' ) );
		}
		if ( ! $trash_link.data( 'original_label' ) ) {
			$trash_link.data( 'original_label', $trash_link.text() );
		}

		// Make perma-delete link
		if ( is_alt_pressed ) {
			$trash_link.attr( 'href', compile_perma_delete_url( $trash_link.data( 'original_href' ) ) );
			$trash_link.text( wp_perma_delete.perma_delete_label_singular );
		}

		// Revert trash link
		else {
			$trash_link.attr( 'href', $trash_link.data( 'original_href' ) );
			$trash_link.text( $trash_link.data( 'original_label' ) );
		}

	}

	/**
	 * Bind hover/focus handlers for all table rows.
	 *
	 * @returns {void}
	 */
	function bind_row_actions() {

		$( '#the-list tr' ).each( function() {

			var $row = $( this );

			// Unbind existing in case of re-binding
			$row.off( 'mouseenter.wp_perma_delete mouseleave.wp_perma_delete focusin.wp_perma_delete focusout.wp_perma_delete' );

			// On hover
			$row.on( 'mouseenter.wp_perma_delete focusin.wp_perma_delete', function() {
				toggle_row_actions( $row );
			} );

			// On hover-away
			$row.on( 'mouseleave.wp_perma_delete focusout.wp_perma_delete', function() {
				is_alt_pressed = false;
				toggle_row_actions( $row );
			} );

		} );

	}

	/**
	 * Make sure the table bulk actions dropdown includes a perma-delete option.
	 *
	 * @returns {void}
	 */
	function add_bulk_perma_delete_option() {

		$( 'select[name="action"], select[name="action2"]' ).each( function() {

			var $select = $( this );

			// Already added
			if ( $select.find( 'option[value="delete"]' ).length ) {
				return;
			}

			// Add the option
			$select.append(
				$( '<option value="delete">' + wp_perma_delete.perma_delete_label_plural + '</option>' )
			);

		} );

	}

	/**
	 * Toggle the edit screen trash and perma-delete link.
	 *
	 * @returns {void}
	 */
	function toggle_edit_screen_link() {

		var $submit_delete = $( '#submitdelete' );
		var $permalink_trash = $( '.submitbox .misc-pub-section .trash a' );

		if ( ! $submit_delete.length && ! $permalink_trash.length ) {
			return;
		}

		var $link = $submit_delete.length ? $submit_delete : $permalink_trash;

		// Save the original link/label
		if ( ! $link.data( 'original_href' ) ) {
			$link.data( 'original_href', $link.attr( 'href' ) );
		}
		if ( ! $link.data( 'original_label' ) ) {
			$link.data( 'original_label', $link.text() );
		}

		// Make perma-delete link
		if ( is_alt_pressed ) {
			$link.attr( 'href', compile_perma_delete_url( $link.data( 'original_href' ) ) );
			$link.text( wp_perma_delete.perma_delete_label_singular );
		}

		// Revert trash link
		else {
			$link.attr( 'href', $link.data( 'original_href' ) );
			$link.text( $link.data( 'original_label' ) );
		}

	}

	/**
	 * Initialize events.
	 *
	 * @returns {void}
	 */
	function init() {

		// Key-press events.
		$( document ).on( 'keydown.wp_perma_delete', key_down );
		$( document ).on( 'keyup.wp_perma_delete', key_up );

		// Initial events and states
		bind_row_actions();
		add_bulk_perma_delete_option();
		toggle_edit_screen_link();

		// Re-bind on ajax changes
		$( document ).ajaxComplete( function() {
			bind_row_actions();
			add_bulk_perma_delete_option();
		} );

	}

	// One-time initialization.
	$( init );

}( jQuery ) );


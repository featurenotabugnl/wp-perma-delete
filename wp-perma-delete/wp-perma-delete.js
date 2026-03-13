/* global jQuery, wp_perma_delete */

( function ( $ ) {
	'use strict';

	var isAltPressed = false;

	function setAltState( event ) {
		isAltPressed = !! event.altKey;
	}

	function refreshCurrentContext() {
		$( '#the-list tr' ).each( function () {
			var $row = $( this );

			if ( $row.is( ':hover' ) ) {
				toggleRowActions( $row );
			}
		} );

		toggleEditScreenLink();
	}

	function handleKeyDown( event ) {
		if ( event.altKey ) {
			isAltPressed = true;
			refreshCurrentContext();
		}
	}

	function handleKeyUp( event ) {
		if ( ! event.altKey ) {
			isAltPressed = false;
			refreshCurrentContext();
		}
	}

	function buildPermanentHrefFromTrash( href ) {
		if ( ! href ) {
			return href;
		}

		if ( href.indexOf( 'action=trash' ) === -1 ) {
			return href;
		}

		return href.replace( 'action=trash', 'action=delete' );
	}

	function toggleRowActions( $row ) {
		var $trashLink = $row.find( '.row-actions .trash a' );

		if ( ! $trashLink.length ) {
			return;
		}

		if ( ! $trashLink.data( 'originalHref' ) ) {
			$trashLink.data( 'originalHref', $trashLink.attr( 'href' ) );
		}

		if ( ! $trashLink.data( 'originalText' ) ) {
			$trashLink.data( 'originalText', $trashLink.text() );
		}

		if ( isAltPressed ) {
			$trashLink.attr( 'href', buildPermanentHrefFromTrash( $trashLink.data( 'originalHref' ) ) );
			$trashLink.text( wp_perma_delete.perma_delete_label_singular );
		} else {
			$trashLink.attr( 'href', $trashLink.data( 'originalHref' ) );
			$trashLink.text( $trashLink.data( 'originalText' ) );
		}
	}

	function bindRowActions() {
		$( '#the-list tr' ).each( function () {
			var $row = $( this );

			$row.off( 'mouseenter.wp_perma_delete mouseleave.wp_perma_delete focusin.wp_perma_delete focusout.wp_perma_delete' );

			$row.on( 'mouseenter.wp_perma_delete focusin.wp_perma_delete', function () {
				toggleRowActions( $row );
			} );

			$row.on( 'mouseleave.wp_perma_delete focusout.wp_perma_delete', function () {
				// On leave, always restore original state.
				isAltPressed = false;
				toggleRowActions( $row );
			} );
		} );
	}

	function toggleEditScreenLink() {
		var $submitDelete = $( '#submitdelete' );
		var $permalinkTrash = $( '.submitbox .misc-pub-section .trash a' );

		if ( ! $submitDelete.length && ! $permalinkTrash.length ) {
			return;
		}

		var $link = $submitDelete.length ? $submitDelete : $permalinkTrash;

		if ( ! $link.data( 'originalHref' ) ) {
			$link.data( 'originalHref', $link.attr( 'href' ) );
		}

		if ( ! $link.data( 'originalText' ) ) {
			$link.data( 'originalText', $link.text() );
		}

		if ( isAltPressed ) {
			$link.attr( 'href', buildPermanentHrefFromTrash( $link.data( 'originalHref' ) ) );
			$link.text( wp_perma_delete.perma_delete_label_singular );
		} else {
			$link.attr( 'href', $link.data( 'originalHref' ) );
			$link.text( $link.data( 'originalText' ) );
		}
	}

	function ensureBulkDeleteOption() {
		var optionValue = 'delete';
		var label = wp_perma_delete.perma_delete_label_plural;

		$( 'select[name="action"], select[name="action2"]' ).each( function () {
			var $select = $( this );

			if ( $select.find( 'option[value="' + optionValue + '"]' ).length ) {
				return;
			}

			$select.append(
				$( '<option></option>' )
					.val( optionValue )
					.text( label )
			);
		} );
	}

	function init() {
		$( document ).on( 'keydown.wp_perma_delete', handleKeyDown );
		$( document ).on( 'keyup.wp_perma_delete', handleKeyUp );

		bindRowActions();
		toggleEditScreenLink();
		ensureBulkDeleteOption();

		$( document ).ajaxComplete( function () {
			bindRowActions();
			ensureBulkDeleteOption();
		} );
	}

	$( init );
}( jQuery ) );


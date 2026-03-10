/* global jQuery, wpPermaDelete */

( function ( $ ) {
	'use strict';

	var isAltPressed = false;

	function setAltState( event ) {
		isAltPressed = event.altKey;
	}

	function handleKeyDown( event ) {
		if ( event.altKey ) {
			isAltPressed = true;
		}
	}

	function handleKeyUp( event ) {
		if ( ! event.altKey ) {
			isAltPressed = false;
		}
	}

	function toggleRowActions( $row ) {
		var $trashLink = $row.find( '.row-actions .trash a' );
		var $deleteLink = $row.find( '.row-actions .delete a' );

		if ( ! $trashLink.length || ! $deleteLink.length ) {
			return;
		}

		if ( isAltPressed ) {
			$trashLink.data( 'originalHref', $trashLink.attr( 'href' ) );
			$trashLink.data( 'originalText', $trashLink.text() );
			$trashLink.attr( 'href', $deleteLink.attr( 'href' ) );
			$trashLink.text( wpPermaDelete.altDeleteLabel );
		} else {
			if ( $trashLink.data( 'originalHref' ) ) {
				$trashLink.attr( 'href', $trashLink.data( 'originalHref' ) );
			}

			if ( $trashLink.data( 'originalText' ) ) {
				$trashLink.text( $trashLink.data( 'originalText' ) );
			}
		}
	}

	function bindRowActions() {
		$( '#the-list tr' ).each( function () {
			var $row = $( this );

			$row.off( 'mouseenter.wpPermaDelete mouseleave.wpPermaDelete focusin.wpPermaDelete focusout.wpPermaDelete' );

			$row.on( 'mouseenter.wpPermaDelete focusin.wpPermaDelete', function () {
				toggleRowActions( $row );
			} );

			$row.on( 'mouseleave.wpPermaDelete focusout.wpPermaDelete', function () {
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

		if ( isAltPressed ) {
			$link.data( 'originalHref', $link.attr( 'href' ) );
			$link.data( 'originalText', $link.text() );
			$link.attr( 'href', $link.attr( 'href' ).replace( 'action=trash', 'action=delete' ) );
			$link.text( wpPermaDelete.altDeleteLabel );
		} else {
			if ( $link.data( 'originalHref' ) ) {
				$link.attr( 'href', $link.data( 'originalHref' ) );
			}

			if ( $link.data( 'originalText' ) ) {
				$link.text( $link.data( 'originalText' ) );
			}
		}
	}

	function ensureBulkDeleteOption() {
		var optionValue = wpPermaDelete.bulkDeleteOptionValue;
		var label = wpPermaDelete.altDeleteBulkLabel;

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
		$( document ).on( 'keydown.wpPermaDelete', handleKeyDown );
		$( document ).on( 'keyup.wpPermaDelete', handleKeyUp );

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


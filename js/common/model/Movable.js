// Copyright 2002-2013, University of Colorado Boulder

/**
 * A movable model element.
 * Semantics of units are determined by the client.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var Property = require( 'AXON/Property' );

  /**
   * Constructor
   * @param {Vector2} location
   * @param {Bounds2} dragBounds
   * @constructor
   */
  function Movable( location, dragBounds ) {
    this.locationProperty = new Property( location );
    this.dragBounds = dragBounds;
  }

  Movable.prototype = {
    reset: function() {
      this.locationProperty.reset();
    }
  };

  return Movable;
} );

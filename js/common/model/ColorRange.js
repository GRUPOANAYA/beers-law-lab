// Copyright 2013-2015, University of Colorado Boulder

/**
 * Range for a color, with interpolation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var beersLawLab = require( 'BEERS_LAW_LAB/beersLawLab' );
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Color} min
   * @param {Color} max
   * @constructor
   */
  function ColorRange( min, max ) {
    // @public (read-only)
    this.min = min;
    this.max = max;
  }

  beersLawLab.register( 'ColorRange', ColorRange );

  return inherit( Object, ColorRange, {

    /**
     * Performs a linear interpolation between min and max colors in RGBA colorspace.
     *
     * @param {number} distance 0-1 (0=min, 1=max)
     * @returns {Color}
     * @public
     */
    interpolateLinear: function( distance ) {
      assert && assert( distance >= 0 && distance <= 1 );
      return Color.interpolateRGBA( this.min, this.max, distance );
    }
  } );
} );
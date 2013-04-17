// Copyright 2002-2013, University of Colorado

/**
 * Range for a color, with interpolation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function ( require ) {
  "use strict";

  // imports
  var Color = require( "common/model/Color" );

  /**
   * @param {Color} min
   * @param {Color} max
   * @constructor
   */
  function ColorRange( min, max ) {
    this.min = min;
    this.max = max;
  }

  /**
   * Performs a linear interpolation between min and max colors in RGBA colorspace.
   *
   * @param {Number} distance 0-1 (0=min, 1=max)
   * @return {Color}
   */
  ColorRange.prototype.interpolateLinear = function( distance ) {
    //TODO assert ( distance >= 0 && distance <= 1 )
    return Color.interpolateRBGA( this.min, this.max, distance );
  };

  return ColorRange;
} );
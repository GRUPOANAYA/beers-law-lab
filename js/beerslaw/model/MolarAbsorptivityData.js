// Copyright 2002-2013, University of Colorado Boulder

/**
 * Container for molar absorptivity data for the visible spectrum of light.
 * Integer precision is sufficient for wavelength, and simplifies lookup.
 * Values were measured experimentally by Julia Chamberlain,
 * and were copy-&-pasted from beers-law-lab/doc/wavelength-to-molarAbsorptivity.csv.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  "use strict";

  // imports
  var assert = require( "ASSERT/assert" )( "beers-law-lab" );
  var VisibleColor = require( "common/util/VisibleColor" );

  /**
   * @param {Array<Number>} molarAbsorptivity
   * @constructor
   */
  function MolarAbsorptivityData( molarAbsorptivity ) {
    assert && assert( molarAbsorptivity.length === VisibleColor.MAX_WAVELENGTH - VisibleColor.MIN_WAVELENGTH + 1 );
    this.molarAbsorptivity = molarAbsorptivity;
    this.lambdaMax = MolarAbsorptivityData._getLambdaMax( molarAbsorptivity );
  }

  /*
   * Maps a visible wavelength to its corresponding molar absorptivity.
   * @param {Number} wavelength
   * @return {Number}
   */
  MolarAbsorptivityData.prototype.wavelengthToMolarAbsorptivity = function( wavelength ) {
    assert && assert( wavelength >= VisibleColor.MIN_WAVELENGTH && wavelength <= VisibleColor.MAX_WAVELENGTH );
    var index = Math.floor( wavelength - VisibleColor.MIN_WAVELENGTH );
    return this.molarAbsorptivity[index];
  };

  /*
   * Finds the wavelength with the maximum molar absorptivity.
   * If there are identical maximums, the lower value is returned.
   * @param {Array<Number>} molarAbsorptivity
   * @return {Number}
   */
  MolarAbsorptivityData._getLambdaMax = function( molarAbsorptivity ) {
    var indexMax = 0;
    var molarAbsorptivityMax = molarAbsorptivity[indexMax];
    for ( var i = 0; i < molarAbsorptivity.length; i++ ) {
      if ( molarAbsorptivity[i] > molarAbsorptivityMax ) {
        molarAbsorptivityMax = molarAbsorptivity[i];
        indexMax = i;
      }
    }
    return indexMax + VisibleColor.MIN_WAVELENGTH;
  };

  MolarAbsorptivityData.DRINK_MIX = new MolarAbsorptivityData( new Array(
    1.09, 1.11, 1.11, 1.14, 1.16, 1.17, 1.18, 1.20, 1.21, 1.23, 1.24, 1.25, 1.24, 1.25, 1.28, 1.30,
    1.31, 1.33, 1.34, 1.33, 1.34, 1.36, 1.39, 1.40, 1.39, 1.40, 1.41, 1.42, 1.42, 1.42, 1.41, 1.43,
    1.44, 1.44, 1.46, 1.47, 1.47, 1.49, 1.51, 1.51, 1.53, 1.53, 1.49, 1.51, 1.52, 1.54, 1.56, 1.56,
    1.54, 1.54, 1.56, 1.57, 1.57, 1.60, 1.59, 1.59, 1.61, 1.62, 1.63, 1.64, 1.66, 1.69, 1.72, 1.75,
    1.78, 1.80, 1.85, 1.90, 1.93, 1.97, 2.02, 2.06, 2.10, 2.16, 2.22, 2.28, 2.33, 2.40, 2.46, 2.52,
    2.58, 2.65, 2.72, 2.80, 2.85, 2.89, 2.96, 3.04, 3.13, 3.19, 3.27, 3.35, 3.40, 3.46, 3.53, 3.59,
    3.67, 3.72, 3.78, 3.87, 3.94, 3.99, 4.05, 4.11, 4.17, 4.26, 4.31, 4.34, 4.38, 4.50, 4.58, 4.62,
    4.69, 4.73, 4.77, 4.81, 4.84, 4.86, 4.88, 4.93, 4.97, 4.99, 5.02, 5.03, 5.03, 5.03, 5.04, 5.04,
    5.06, 5.06, 5.06, 5.05, 5.05, 5.05, 5.06, 5.01, 4.98, 4.96, 4.95, 4.95, 4.93, 4.93, 4.92, 4.87,
    4.84, 4.82, 4.78, 4.76, 4.72, 4.65, 4.60, 4.54, 4.49, 4.44, 4.38, 4.32, 4.25, 4.19, 4.11, 4.01,
    3.92, 3.82, 3.71, 3.63, 3.53, 3.39, 3.27, 3.15, 3.02, 2.93, 2.82, 2.70, 2.55, 2.42, 2.30, 2.17,
    2.07, 1.96, 1.84, 1.72, 1.61, 1.51, 1.43, 1.34, 1.24, 1.16, 1.10, 1.05, 0.96, 0.87, 0.80, 0.76,
    0.70, 0.65, 0.62, 0.58, 0.55, 0.52, 0.49, 0.46, 0.44, 0.40, 0.38, 0.37, 0.36, 0.35, 0.33, 0.32,
    0.32, 0.31, 0.32, 0.30, 0.29, 0.29, 0.29, 0.29, 0.28, 0.26, 0.26, 0.25, 0.25, 0.25, 0.23, 0.26,
    0.28, 0.27, 0.25, 0.25, 0.26, 0.26, 0.24, 0.24, 0.24, 0.25, 0.25, 0.26, 0.25, 0.25, 0.24, 0.24,
    0.24, 0.23, 0.24, 0.26, 0.27, 0.26, 0.23, 0.24, 0.24, 0.24, 0.25, 0.24, 0.24, 0.24, 0.24, 0.26,
    0.26, 0.25, 0.24, 0.24, 0.25, 0.26, 0.25, 0.25, 0.25, 0.22, 0.23, 0.26, 0.26, 0.23, 0.23, 0.24,
    0.23, 0.21, 0.23, 0.25, 0.24, 0.24, 0.24, 0.26, 0.25, 0.22, 0.21, 0.23, 0.25, 0.27, 0.26, 0.23,
    0.23, 0.24, 0.22, 0.22, 0.22, 0.21, 0.24, 0.25, 0.24, 0.26, 0.25, 0.23, 0.24, 0.24, 0.24, 0.24,
    0.23, 0.24, 0.26, 0.24, 0.22, 0.23, 0.21, 0.23, 0.26, 0.24, 0.24, 0.24, 0.23, 0.24, 0.24, 0.26,
    0.27, 0.23, 0.24, 0.24, 0.22, 0.21, 0.22, 0.25, 0.24, 0.23, 0.23, 0.23, 0.22, 0.20, 0.20, 0.22,
    0.22, 0.21, 0.21, 0.21, 0.22, 0.22, 0.23, 0.23, 0.21, 0.21, 0.23, 0.24, 0.25, 0.24, 0.25, 0.21,
    0.20, 0.20, 0.19, 0.20, 0.22, 0.22, 0.24, 0.24, 0.25, 0.24, 0.25, 0.25, 0.25, 0.26, 0.26, 0.23,
    0.22, 0.24, 0.24, 0.21, 0.22, 0.23, 0.25, 0.25, 0.20, 0.18, 0.21, 0.23, 0.21, 0.22, 0.21, 0.21,
    0.20, 0.20, 0.24, 0.22, 0.22, 0.22, 0.24, 0.22, 0.21, 0.22, 0.20, 0.20, 0.19, 0.19, 0.18, 0.22,
    0.22
  ) );

  MolarAbsorptivityData.COBALT_II_NITRATE = new MolarAbsorptivityData( new Array(
    0.32, 0.27, 0.23, 0.18, 0.15, 0.13, 0.12, 0.1, 0.07, 0.05, 0.05, 0.03, 0.03, 0.03, 0.03, 0.02, 0.02,
    0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.03, 0.03, 0.03, 0.03, 0.05, 0.05,
    0.05, 0.05, 0.07, 0.07, 0.07, 0.08, 0.08, 0.1, 0.1, 0.1, 0.12, 0.12, 0.13, 0.13, 0.15, 0.15, 0.17, 0.18,
    0.2, 0.2, 0.22, 0.22, 0.23, 0.23, 0.25, 0.27, 0.27, 0.28, 0.28, 0.3, 0.3, 0.32, 0.32, 0.33, 0.35, 0.35,
    0.37, 0.38, 0.4, 0.42, 0.43, 0.45, 0.47, 0.48, 0.5, 0.53, 0.55, 0.58, 0.6, 0.63, 0.67, 0.7, 0.73, 0.77,
    0.8, 0.85, 0.88, 0.93, 0.97, 1, 1.05, 1.1, 1.15, 1.2, 1.27, 1.32, 1.38, 1.43, 1.5, 1.57, 1.63, 1.7, 1.77,
    1.83, 1.92, 1.98, 2.07, 2.13, 2.22, 2.28, 2.35, 2.42, 2.5, 2.57, 2.64, 2.69, 2.65, 2.67, 2.84, 2.92,
    2.97, 3.02, 3.07, 3.1, 3.14, 3.19, 3.24, 3.29, 3.32, 3.37, 3.4, 3.45, 3.49, 3.54, 3.57, 3.59, 3.62,
    3.65, 3.67, 3.7, 3.74, 3.75, 3.8, 3.84, 3.87, 3.92, 3.97, 4.02, 4.07, 4.1, 4.15, 4.2, 4.25, 4.3, 4.35,
    4.4, 4.44, 4.49, 4.54, 4.57, 4.6, 4.64, 4.65, 4.69, 4.7, 4.72, 4.72, 4.72, 4.72, 4.72, 4.7, 4.7, 4.67,
    4.65, 4.62, 4.59, 4.55, 4.5, 4.45, 4.4, 4.35, 4.29, 4.22, 4.15, 4.07, 3.87, 3.85, 3.85, 3.77, 3.67,
    3.59, 3.52, 3.4, 3.3, 3.22, 3.12, 3, 2.9, 2.79, 2.72, 2.62, 2.54, 2.43, 2.33, 2.25, 2.17, 2.08,
    2, 1.91, 1.83, 1.74, 1.66, 1.57, 1.49, 1.4, 1.32, 1.24, 1.15, 1.15, 1.13, 1.07, 1.02, 0.97,
    0.93, 0.9, 0.85, 0.8, 0.77, 0.72, 0.7, 0.67, 0.63, 0.62, 0.58, 0.57, 0.53, 0.52, 0.5, 0.48, 0.47,
    0.47, 0.45, 0.43, 0.42, 0.42, 0.4, 0.4, 0.38, 0.38, 0.37, 0.37, 0.37, 0.37, 0.35, 0.35, 0.35, 0.35,
    0.35, 0.33, 0.33, 0.33, 0.33, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
    0.3, 0.3, 0.3, 0.3, 0.3, 0.28, 0.28, 0.28, 0.3, 0.28, 0.3, 0.3, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28,
    0.28, 0.27, 0.28, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.25, 0.25, 0.25, 0.25, 0.25,
    0.25, 0.23, 0.23, 0.23, 0.23, 0.22, 0.22, 0.22, 0.22, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.18, 0.18,
    0.18, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.15, 0.17, 0.15, 0.13, 0.15, 0.13, 0.13, 0.13,
    0.13, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.1, 0.12, 0.1, 0.1, 0.1, 0.08, 0.1, 0.08, 0.08,
    0.08, 0.1, 0.08, 0.08, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.05, 0.07, 0.07, 0.05, 0.07,
    0.07, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.03, 0.03, 0.03, 0.03, 0.05,
    0.05, 0.03, 0.03, 0.03, 0.03
  ) );

  MolarAbsorptivityData.COBALT_CHLORIDE = new MolarAbsorptivityData( new Array(
    7.01, 6.97, 6.94, 6.91, 6.87, 6.84, 6.81, 6.77, 6.73, 6.7, 6.66, 6.64, 6.62, 6.59, 6.55, 6.53, 6.5, 6.46, 6.43, 6.4,
    6.38, 6.34, 6.32, 6.29, 6.28, 6.24, 6.22, 6.19, 6.17, 6.14, 6.11, 6.09, 6.07, 6.06, 6.02, 6, 5.98, 5.96, 5.93, 5.91,
    5.89, 5.87, 5.86, 5.83, 5.82, 5.8, 5.78, 5.77, 5.75, 5.74, 5.71, 5.7, 5.69, 5.67, 5.66, 5.65, 5.64, 5.61, 5.6, 5.58,
    5.57, 5.55, 5.54, 5.53, 5.51, 5.49, 5.48, 5.47, 5.45, 5.45, 5.44, 5.43, 5.41, 5.41, 5.4, 5.39, 5.39, 5.38, 5.38, 5.38,
    5.38, 5.37, 5.37, 5.38, 5.38, 5.39, 5.39, 5.4, 5.41, 5.43, 5.44, 5.46, 5.47, 5.48, 5.5, 5.51, 5.54, 5.56, 5.58, 5.61,
    5.64, 5.67, 5.69, 5.72, 5.76, 5.79, 5.83, 5.87, 5.91, 5.94, 5.99, 6.03, 6.08, 6.11, 6.14, 6.19, 6.23, 6.27, 6.3, 6.33,
    6.3, 6.3, 6.4, 6.44, 6.46, 6.49, 6.51, 6.53, 6.54, 6.56, 6.59, 6.61, 6.63, 6.64, 6.66, 6.69, 6.7, 6.72, 6.73, 6.74,
    6.74, 6.75, 6.76, 6.77, 6.78, 6.78, 6.81, 6.83, 6.84, 6.86, 6.88, 6.91, 6.93, 6.95, 6.97, 7.01, 7.03, 7.06, 7.08,
    7.11, 7.13, 7.14, 7.16, 7.18, 7.19, 7.2, 7.22, 7.22, 7.22, 7.23, 7.22, 7.2, 7.19, 7.18, 7.16, 7.15, 7.12, 7.08, 7.05,
    7.02, 6.97, 6.93, 6.88, 6.84, 6.78, 6.73, 6.67, 6.61, 6.54, 6.39, 6.35, 6.34, 6.27, 6.19, 6.11, 6.04, 5.96, 5.87,
    5.79, 5.71, 5.61, 5.53, 5.43, 5.37, 5.29, 5.2, 5.13, 5.04, 4.96, 4.89, 4.82, 4.74, 4.67, 4.59, 4.52, 4.45, 4.37,
    4.3, 4.22, 4.15, 4.07, 4, 4, 3.99, 3.93, 3.87, 3.82, 3.78, 3.75, 3.7, 3.66, 3.61, 3.58, 3.55, 3.51, 3.49, 3.46, 3.43,
    3.4, 3.38, 3.35, 3.33, 3.3, 3.28, 3.27, 3.25, 3.23, 3.22, 3.19, 3.18, 3.16, 3.15, 3.14, 3.13, 3.12, 3.11, 3.09, 3.07,
    3.06, 3.05, 3.04, 3.03, 3.02, 3.02, 2.99, 2.99, 2.97, 2.96, 2.96, 2.95, 2.94, 2.93, 2.92, 2.92, 2.91, 2.9, 2.88, 2.88,
    2.87, 2.86, 2.85, 2.84, 2.84, 2.83, 2.82, 2.82, 2.81, 2.8, 2.8, 2.78, 2.77, 2.76, 2.76, 2.75, 2.74, 2.74, 2.73, 2.72,
    2.71, 2.7, 2.7, 2.67, 2.67, 2.66, 2.66, 2.65, 2.64, 2.64, 2.62, 2.62, 2.61, 2.6, 2.6, 2.59, 2.57, 2.56, 2.55, 2.55,
    2.54, 2.53, 2.52, 2.51, 2.51, 2.5, 2.49, 2.48, 2.48, 2.45, 2.45, 2.44, 2.43, 2.42, 2.42, 2.41, 2.4, 2.39, 2.39, 2.38,
    2.36, 2.35, 2.35, 2.34, 2.32, 2.32, 2.31, 2.3, 2.3, 2.29, 2.29, 2.28, 2.27, 2.25, 2.24, 2.24, 2.23, 2.22, 2.22, 2.21,
    2.21, 2.2, 2.19, 2.18, 2.18, 2.17, 2.17, 2.15, 2.14, 2.13, 2.12, 2.12, 2.12, 2.11, 2.1, 2.1, 2.09, 2.08, 2.08, 2.07,
    2.07, 2.07, 2.04, 2.04, 2.03, 2.02, 2.02, 2.02, 2.01, 2.01, 2, 2, 1.99, 1.98, 1.98, 1.97, 1.97, 1.97, 1.96, 1.94, 1.94,
    1.94, 1.93
  ) );

  MolarAbsorptivityData.POTASSIUM_DICHROMATE = new MolarAbsorptivityData( new Array(
    3245.74, 3305.84, 3365.95, 3396, 3456.11, 3516.21, 3546.27, 3546.27, 3576.32, 3606.37, 3636.43, 3666.48, 3696.53, 3696.53,
    3696.53, 3696.53, 3696.53, 3666.48, 3666.48, 3636.43, 3636.43, 3606.37, 3606.37, 3576.32, 3546.27, 3516.21, 3456.11, 3396,
    3365.95, 3305.84, 3275.79, 3245.74, 3185.63, 3155.58, 3095.47, 3035.36, 2975.26, 2885.1, 2824.99, 2734.83, 2674.73, 2584.57,
    2554.51, 2494.41, 2434.3, 2344.14, 2284.04, 2193.88, 2103.72, 2013.56, 1923.4, 1833.24, 1773.13, 1713.03, 1652.92, 1592.82,
    1532.71, 1442.55, 1382.44, 1322.34, 1262.23, 1202.12, 1142.02, 1111.97, 1051.86, 1021.81, 991.75, 931.65, 901.59, 871.54,
    841.49, 811.43, 811.43, 781.38, 781.38, 751.33, 751.33, 751.33, 721.27, 721.27, 691.22, 691.22, 691.22, 691.22, 691.22,
    691.22, 661.17, 661.17, 661.17, 661.17, 661.17, 661.17, 661.17, 661.17, 631.12, 631.12, 631.12, 631.12, 631.12, 631.12,
    601.06, 601.06, 601.06, 601.06, 601.06, 601.06, 571.01, 571.01, 571.01, 571.01, 571.01, 540.96, 540.96, 540.96, 540.96,
    540.96, 510.9, 510.9, 510.9, 480.85, 450.8, 420.74, 450.8, 480.85, 450.8, 450.8, 450.8, 420.74, 420.74, 420.74, 420.74,
    390.69, 390.69, 390.69, 390.69, 360.64, 360.64, 330.58, 330.58, 330.58, 330.58, 330.58, 330.58, 300.53, 300.53, 300.53,
    300.53, 270.48, 270.48, 270.48, 270.48, 270.48, 270.48, 240.42, 240.42, 240.42, 240.42, 210.37, 210.37, 210.37, 210.37,
    210.37, 210.37, 210.37, 210.37, 180.32, 180.32, 180.32, 180.32, 180.32, 180.32, 180.32, 180.32, 150.27, 150.27, 150.27,
    150.27, 150.27, 150.27, 150.27, 150.27, 150.27, 120.21, 120.21, 150.27, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21,
    120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 120.21, 90.16, 120.21,
    90.16, 90.16, 88.01, 85.87, 83.72, 81.57, 79.43, 77.28, 75.13, 72.99, 70.84, 68.69, 66.55, 64.4, 62.25, 60.11, 60.11,
    180.32, 90.16, 120.21, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16,
    90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 120.21, 90.16, 90.16, 90.16, 90.16,
    90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16,
    90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16,
    90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 90.16, 60.11, 90.16, 60.11, 90.16, 90.16,
    90.16, 60.11, 90.16, 90.16, 90.16, 90.16, 90.16, 60.11, 90.16, 90.16, 60.11, 90.16, 60.11, 90.16, 60.11, 60.11, 90.16,
    60.11, 60.11, 90.16, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 90.16, 60.11, 60.11, 90.16, 90.16, 90.16, 90.16, 60.11,
    60.11, 60.11, 60.11, 60.11, 90.16, 60.11, 60.11, 60.11, 60.11, 90.16, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11,
    60.11, 60.11, 60.11, 90.16, 90.16, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 90.16,
    60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 90.16, 60.11,
    60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11, 60.11
  ) );

  MolarAbsorptivityData.POTASSIUM_CHROMATE = new MolarAbsorptivityData( new Array(
    1737.67, 1805.81, 1908.03, 2010.24, 2146.53, 2248.75, 2350.96, 2453.18, 2589.47, 2725.75, 2862.04, 2964.26, 3100.55,
    3202.76, 3304.98, 3441.26, 3577.55, 3713.84, 3816.06, 3918.27, 4054.56, 4156.78, 4224.92, 4293.06, 4395.28, 4497.49,
    4565.64, 4633.78, 4701.93, 4736, 4736, 4770.07, 4770.07, 4770.07, 4770.07, 4770.07, 4736, 4736, 4667.85, 4633.78,
    4531.57, 4429.35, 4327.14, 4224.92, 4122.7, 4020.49, 3884.2, 3781.98, 3679.77, 3543.48, 3407.19, 3236.83, 3134.62,
    2998.33, 2862.04, 2691.68, 2555.39, 2385.04, 2282.82, 2180.6, 2044.32, 1942.1, 1839.88, 1737.67, 1601.38, 1499.16,
    1431.02, 1328.81, 1226.59, 1158.45, 1090.3, 1022.16, 988.09, 954.01, 919.94, 851.8, 817.73, 783.65, 783.65, 749.58,
    715.51, 681.44, 681.44, 647.37, 647.37, 613.29, 613.29, 579.22, 545.15, 545.15, 545.15, 511.08, 511.08, 477.01, 477.01,
    477.01, 442.94, 442.94, 408.86, 408.86, 408.86, 374.79, 374.79, 340.72, 340.72, 340.72, 306.65, 306.65, 306.65, 306.65,
    272.58, 272.58, 272.58, 272.58, 238.5, 238.5, 238.5, 204.43, 204.43, 204.43, 170.36, 136.29, 170.36, 204.43, 170.36,
    170.36, 170.36, 170.36, 170.36, 170.36, 170.36, 136.29, 136.29, 136.29, 136.29, 136.29, 136.29, 136.29, 136.29, 136.29,
    136.29, 136.29, 136.29, 136.29, 136.29, 136.29, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22,
    102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22,
    102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 68.14, 102.22,
    102.22, 102.22, 102.22, 102.22, 102.22, 68.14, 102.22, 68.14, 102.22, 102.22, 102.22, 102.22, 102.22, 102.22, 68.14,
    68.14, 68.14, 68.14, 68.14, 68.14, 102.22, 68.14, 68.14, 65.71, 63.28, 60.84, 58.41, 55.98, 53.54, 51.11, 48.67, 46.24,
    43.81, 41.37, 38.94, 36.51, 34.07, 34.07, 102.22, 136.29, 136.29, 68.14, 68.14, 68.14, 102.22, 68.14, 68.14, 68.14, 68.14,
    68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 102.22, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14,
    68.14, 102.22, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14,
    68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14,
    68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14,
    68.14, 34.07, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 34.07, 68.14, 68.14, 68.14, 68.14, 34.07, 68.14, 68.14, 68.14,
    68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 34.07, 34.07, 68.14, 34.07, 68.14, 68.14, 34.07,
    68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 68.14, 34.07, 34.07, 34.07, 34.07, 68.14, 34.07, 68.14, 68.14,
    68.14, 68.14, 68.14, 34.07, 68.14, 68.14, 68.14, 34.07, 34.07, 34.07, 68.14, 34.07, 68.14, 68.14, 34.07, 68.14, 68.14,
    34.07, 68.14, 34.07, 34.07, 34.07, 68.14, 68.14, 34.07, 68.14, 34.07, 68.14, 68.14, 34.07, 68.14, 68.14, 34.07, 68.14,
    68.14, 34.07, 34.07, 34.07, 68.14, 68.14, 68.14, 34.07, 68.14, 68.14, 34.07, 68.14, 34.07, 68.14
  ) );

  MolarAbsorptivityData.NICKEL_II_CHLORIDE = new MolarAbsorptivityData( new Array(
    0.31, 0.33, 0.34, 0.36, 0.39, 0.41, 0.43, 0.46, 0.48, 0.51, 0.57, 0.58, 0.63, 0.67, 0.7, 0.75, 0.8, 0.86, 0.92, 0.99,
    1.08, 1.16, 1.25, 1.32, 1.44, 1.56, 1.68, 1.82, 1.95, 2.09, 2.26, 2.41, 2.55, 2.69, 2.86, 3.03, 3.22, 3.41, 3.58,
    3.75, 3.92, 4.09, 4.25, 4.4, 4.56, 4.68, 4.81, 4.93, 5.03, 5.1, 5.19, 5.24, 5.29, 5.31, 5.31, 5.31, 5.31, 5.26,
    5.22, 5.17, 5.1, 5.02, 4.93, 4.85, 4.74, 4.64, 4.52, 4.4, 4.28, 4.16, 4.01, 3.89, 3.77, 3.61, 3.48, 3.34, 3.19,
    3.03, 2.88, 2.72, 2.57, 2.43, 2.29, 2.16, 2.02, 1.9, 1.78, 1.66, 1.54, 1.46, 1.34, 1.25, 1.16, 1.1, 1.03, 0.98,
    0.91, 0.84, 0.79, 0.75, 0.7, 0.67, 0.63, 0.62, 0.6, 0.57, 0.55, 0.53, 0.51, 0.5, 0.48, 0.48, 0.46, 0.45, 0.43,
    0.43, 0.41, 0.41, 0.39, 0.38, 0.33, 0.31, 0.33, 0.33, 0.33, 0.31, 0.29, 0.29, 0.27, 0.26, 0.24, 0.24, 0.22,
    0.21, 0.21, 0.19, 0.17, 0.17, 0.15, 0.14, 0.14, 0.12, 0.12, 0.1, 0.1, 0.09, 0.09, 0.09, 0.07, 0.07, 0.07,
    0.07, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
    0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.07, 0.07, 0.07, 0.07, 0.07, 0.09, 0.07, 0.09, 0.09, 0.09, 0.09, 0.09,
    0.1, 0.1, 0.09, 0.09, 0.1, 0.1, 0.12, 0.12, 0.12, 0.12, 0.12, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14,
    0.14, 0.14, 0.14, 0.14, 0.15, 0.16, 0.17, 0.17, 0.18, 0.19, 0.2, 0.2, 0.21, 0.22, 0.23, 0.23, 0.24, 0.24,
    0.27, 0.24, 0.22, 0.22, 0.24, 0.26, 0.26, 0.26, 0.26, 0.27, 0.29, 0.29, 0.31, 0.33, 0.33, 0.33, 0.34, 0.36,
    0.36, 0.38, 0.39, 0.41, 0.43, 0.43, 0.45, 0.46, 0.48, 0.5, 0.5, 0.51, 0.53, 0.55, 0.57, 0.58, 0.6, 0.62,
    0.63, 0.65, 0.67, 0.69, 0.72, 0.74, 0.75, 0.77, 0.79, 0.82, 0.84, 0.87, 0.89, 0.91, 0.94, 0.96, 0.99, 1.01,
    1.04, 1.06, 1.1, 1.11, 1.13, 1.16, 1.2, 1.22, 1.25, 1.27, 1.3, 1.34, 1.35, 1.39, 1.42, 1.44, 1.47, 1.51,
    1.52, 1.56, 1.58, 1.59, 1.63, 1.64, 1.66, 1.7, 1.71, 1.75, 1.76, 1.78, 1.8, 1.83, 1.85, 1.85, 1.88, 1.9,
    1.92, 1.92, 1.94, 1.94, 1.94, 1.94, 1.94, 1.94, 1.94, 1.92, 1.92, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.88, 1.88,
    1.88, 1.9, 1.88, 1.9, 1.9, 1.9, 1.9, 1.9, 1.92, 1.94, 1.94, 1.94, 1.95, 1.95, 1.97, 1.97, 1.99, 1.99, 2, 2,
    2.02, 2.04, 2.04, 2.06, 2.06, 2.07, 2.09, 2.09, 2.09, 2.12, 2.12, 2.14, 2.14, 2.16, 2.16, 2.17, 2.17, 2.17,
    2.19, 2.19, 2.21, 2.21, 2.23, 2.23, 2.23, 2.23, 2.23, 2.24, 2.24, 2.24, 2.24, 2.24, 2.24, 2.23, 2.23,
    2.23, 2.23, 2.21, 2.21, 2.21, 2.19, 2.19, 2.17, 2.16, 2.14, 2.14, 2.12, 2.11, 2.11
  ) );

  MolarAbsorptivityData.COPPER_SULFATE = new MolarAbsorptivityData( new Array(
    0.23, 0.23, 0.23, 0.22, 0.22, 0.22, 0.22, 0.2, 0.2, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18,
    0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.13,
    0.14, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11,
    0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.11, 0.09, 0.09, 0.09,
    0.11, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.11, 0.09, 0.09, 0.09,
    0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07,
    0.07, 0.07, 0.07, 0.07, 0.05, 0.07, 0.07, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
    0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
    0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
    0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.07, 0.05, 0.07,
    0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.09, 0.09,
    0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.09, 0.11, 0.13, 0.13,
    0.13, 0.13, 0.14, 0.14, 0.14, 0.16, 0.16, 0.16, 0.16, 0.16, 0.18, 0.18, 0.18, 0.2, 0.2, 0.21, 0.22,
    0.23, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3, 0.31, 0.33, 0.34, 0.35, 0.36, 0.36, 0.36, 0.36, 0.34, 0.34,
    0.36, 0.38, 0.38, 0.4, 0.4, 0.4, 0.42, 0.43, 0.45, 0.45, 0.47, 0.47, 0.49, 0.51, 0.52, 0.54, 0.54,
    0.56, 0.58, 0.6, 0.61, 0.63, 0.65, 0.67, 0.69, 0.7, 0.72, 0.74, 0.76, 0.79, 0.79, 0.81, 0.85, 0.87,
    0.89, 0.92, 0.94, 0.96, 0.99, 1.01, 1.03, 1.07, 1.08, 1.12, 1.16, 1.17, 1.21, 1.23, 1.26, 1.3, 1.34,
    1.37, 1.41, 1.43, 1.46, 1.52, 1.55, 1.59, 1.63, 1.66, 1.72, 1.75, 1.79, 1.84, 1.88, 1.92, 1.97, 2.01,
    2.06, 2.1, 2.15, 2.19, 2.24, 2.29, 2.35, 2.38, 2.44, 2.51, 2.55, 2.6, 2.67, 2.73, 2.78, 2.84, 2.89,
    2.96, 3.02, 3.07, 3.13, 3.2, 3.27, 3.32, 3.4, 3.45, 3.5, 3.58, 3.65, 3.72, 3.79, 3.87, 3.94, 4.01,
    4.08, 4.16, 4.23, 4.3, 4.35, 4.44, 4.52, 4.59, 4.66, 4.75, 4.82, 4.91, 4.99, 5.06, 5.15, 5.22, 5.29,
    5.38, 5.46, 5.56, 5.64, 5.71, 5.8, 5.87, 5.96, 6.02, 6.11, 6.2, 6.29, 6.38, 6.45, 6.52, 6.61, 6.68,
    6.77, 6.87, 6.96, 7.01, 7.12, 7.19, 7.26, 7.35, 7.44, 7.52, 7.61, 7.68, 7.75, 7.82, 7.91, 7.99, 8.08,
    8.15, 8.24, 8.31, 8.38, 8.46, 8.55, 8.62, 8.69, 8.76, 8.83, 8.92, 8.98, 9.05, 9.12, 9.2, 9.27, 9.34,
    9.39, 9.47, 9.54, 9.61
  ) );

  MolarAbsorptivityData.POTASSIUM_PERMANGANATE = new MolarAbsorptivityData( new Array(
    1277.2, 1271.32, 1265.43, 1259.55, 1253.66, 1247.78, 1241.89, 1236, 1218.35, 1206.58, 1194.8,
    1183.03, 1171.26, 1159.49, 1141.83, 1130.06, 1112.4, 1088.86, 1065.32, 1047.66, 1024.12,
    1000.58, 977.03, 959.37, 929.95, 906.4, 882.86, 847.55, 824, 794.57, 765.15, 741.6, 712.17,
    694.52, 665.09, 635.66, 612.12, 582.69, 553.26, 529.72, 500.29, 476.74, 453.2, 435.54, 412,
    388.46, 364.92, 347.26, 323.72, 306.06, 282.52, 264.86, 247.2, 235.43, 223.66, 206, 194.23,
    176.57, 170.69, 158.91, 141.26, 135.37, 123.6, 117.71, 111.83, 100.06, 94.17, 88.29, 82.4,
    82.4, 76.51, 70.63, 64.74, 64.74, 64.74, 64.74, 58.86, 58.86, 58.86, 58.86, 58.86, 58.86,
    58.86, 58.86, 58.86, 64.74, 64.74, 64.74, 64.74, 70.63, 70.63, 76.51, 76.51, 82.4, 88.29,
    88.29, 94.17, 100.06, 105.94, 111.83, 117.71, 123.6, 123.6, 129.49, 135.37, 141.26, 147.14,
    158.91, 164.8, 176.57, 188.34, 200.12, 211.89, 223.66, 235.43, 247.2, 258.97, 264.86, 276.63,
    282.52, 276.63, 282.52, 317.83, 347.26, 370.8, 394.34, 423.77, 447.32, 470.86, 494.4, 517.94,
    535.6, 553.26, 570.92, 582.69, 600.35, 618, 641.55, 665.09, 700.4, 735.72, 776.92, 824, 871.09,
    918.17, 953.49, 994.69, 1030, 1059.43, 1077.09, 1094.75, 1106.52, 1118.29, 1130.06, 1147.72,
    1177.15, 1212.46, 1259.55, 1312.52, 1377.26, 1442.01, 1512.63, 1583.26, 1648.01, 1700.98,
    1742.18, 1777.49, 1789.26, 1795.15, 1789.26, 1777.49, 1765.72, 1759.83, 1759.83, 1771.61,
    1795.15, 1836.35, 1895.21, 1959.95, 2030.58, 2107.09, 2183.61, 2248.35, 2307.21, 2354.29,
    2383.72, 2389.61, 2377.84, 2336.64, 2248.35, 2207.15, 2177.72, 2118.86, 2065.89, 2024.69,
    2007.04, 1995.26, 2007.04, 2024.69, 2060.01, 2107.09, 2154.18, 2189.49, 2236.58, 2277.78,
    2301.32, 2307.21, 2295.44, 2222.29, 2149.13, 2075.98, 2002.83, 1929.68, 1856.53, 1783.38,
    1710.23, 1637.08, 1563.92, 1490.77, 1417.62, 1344.47, 1271.32, 1271.32, 1283.09, 1283.09,
    1300.75, 1294.86, 1294.86, 1288.98, 1283.09, 1253.66, 1230.12, 1194.8, 1147.72, 1094.75,
    1030, 959.37, 888.75, 812.23, 741.6, 676.86, 612.12, 559.14, 506.17, 464.97, 429.66, 394.34,
    364.92, 341.37, 323.72, 311.94, 294.29, 288.4, 276.63, 264.86, 258.97, 253.09, 247.2, 241.32,
    241.32, 235.43, 235.43, 229.54, 223.66, 223.66, 217.77, 217.77, 211.89, 211.89, 206, 206,
    200.12, 200.12, 194.23, 194.23, 194.23, 188.34, 188.34, 188.34, 188.34, 182.46, 182.46,
    182.46, 182.46, 176.57, 176.57, 176.57, 176.57, 176.57, 176.57, 170.69, 170.69, 170.69,
    164.8, 170.69, 164.8, 164.8, 158.91, 158.91, 153.03, 158.91, 153.03, 153.03, 147.14,
    153.03, 147.14, 147.14, 141.26, 141.26, 141.26, 135.37, 135.37, 129.49, 135.37, 135.37,
    123.6, 123.6, 123.6, 117.71, 117.71, 117.71, 117.71, 117.71, 111.83, 111.83, 111.83, 105.94,
    105.94, 100.06, 100.06, 100.06, 100.06, 88.29, 94.17, 94.17, 88.29, 88.29, 88.29, 88.29,
    82.4, 82.4, 76.51, 76.51, 76.51, 70.63, 70.63, 70.63, 64.74, 64.74, 64.74, 64.74, 64.74,
    52.97, 58.86, 58.86, 52.97, 52.97, 52.97, 52.97, 47.09, 47.09, 47.09, 47.09, 47.09, 41.2,
    41.2, 41.2, 41.2, 41.2, 41.2, 35.31, 35.31, 35.31, 35.31, 29.43, 35.31, 29.43, 29.43, 29.43,
    29.43, 29.43, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54, 23.54,
    23.54, 17.66, 17.66, 17.66, 17.66, 17.66, 17.66, 17.66, 17.66
  ) );

  return MolarAbsorptivityData;
} );
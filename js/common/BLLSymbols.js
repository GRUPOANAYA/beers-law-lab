// Copyright 2002-2013, University of Colorado Boulder

/**
 * Universal chemical symbols, no i18n needed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var toSubscript = require( 'NITROGLYCERIN/ChemUtils' ).toSubscript;
  var BLLStrings = require( 'BEERS_LAW_LAB/common/BLLStrings' );

  return {
    COBALT_II_NITRATE: toSubscript( 'Co(NO3)2' ),
    COBALT_CHLORIDE: toSubscript( 'CoCl2' ),
    COPPER_SULFATE: toSubscript( 'CuSO4' ),
    DRINK_MIX: BLLStrings.drinkMix,
    NICKEL_II_CHLORIDE: toSubscript( 'NiCl2' ),
    POTASSIUM_CHROMATE: toSubscript( 'K2CrO4' ),
    POTASSIUM_DICHROMATE: toSubscript( 'K2Cr2O7' ),
    POTASSIUM_PERMANGANATE: toSubscript( 'KMnO4' ),
    WATER: toSubscript( 'H2O' )
  };
} );
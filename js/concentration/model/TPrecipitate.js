// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var beersLawLab = require( 'BEERS_LAW_LAB/beersLawLab' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TPrecipitateParticle = require( 'BEERS_LAW_LAB/concentration/model/TPrecipitateParticle' );

  var TPrecipitate = function( instance, phetioID ) {
    TObject.call( this, instance, phetioID );
    assertInstanceOf( instance, phet.beersLawLab.Precipitate );
  };

  phetioInherit( TObject, 'TPrecipitate', TPrecipitate, {}, {
    documentation: 'The precipitate that comes from the solution',

    clearChildInstances: function( instance ) {
      instance.removeAllParticles();
      instance.fireChanged();
    },

    /**
     * Adds a precipitate particle as specified by the phetioID and state.
     * @param {Object} instance
     * @param {Tandem} tandem
     * @param {Object} stateObject
     */
    addChildInstance: function( instance, tandem, stateObject ) {

      var value = TPrecipitateParticle.fromStateObject( stateObject );

      instance.particles.push( new phet.beersLawLab.PrecipitateParticle(
        value.solute,
        value.location,
        value.orientation,
        tandem
      ) );
      instance.fireChanged();
    }

  } );

   beersLawLab.register( 'TPrecipitate', TPrecipitate );

  return TPrecipitate;
} );


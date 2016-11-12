// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var phetio = require( 'PHET_IO/phetio' );
  var TPrecipitateParticle = require( 'PHET_IO/simulations/beers-law-lab/TPrecipitateParticle' );

  var TPrecipitate = function( instance, phetioID ) {
    TObject.call( this, instance, phetioID );
    assertInstanceOf( instance, phet.beersLawLab.Precipitate );
  };

  phetioInherit( TObject, 'TPrecipitate', TPrecipitate, {}, {

    clearChildInstances: function( instance ) {
      instance.removeAllParticles();
      instance.fireChanged();
    },

    /**
     * Create a dynamic particle as specified by the phetioID and state.
     * @param {Object} instance
     * @param {Tandem} tandem
     * @param {Object} stateObject
     * @returns {ChargedParticle}
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
    },

    toStateObject: function( instance ) {

      // TODO: Just returning a string from here doesn't work.... why?
      return { phetioID: instance.phetioID };
    },

    fromStateObject: function( stateObject ) {
      return phetio.getInstance( stateObject.phetioID );
    },

    setValue: function( instance, value ) {
      instance.removeAllParticles();
    }
  } );

  phetioNamespace.register( 'TPrecipitate', TPrecipitate );

  return TPrecipitate;
} );


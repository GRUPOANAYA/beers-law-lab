// Copyright 2002-2013, University of Colorado Boulder

/**
 * Solution model for the 'Concentration' screen.
 * This screen has a single solution that is mutated by changing the solute, solute amount, and volume.
 * Concentration is derived via M=mol/L.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Fluid = require( 'BEERS_LAW_LAB/common/model/Fluid' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Solvent = require( 'BEERS_LAW_LAB/common/model/Solvent' );

  /**
   * @param {Property.<Solute>} soluteProperty
   * @param {number} soluteAmount moles
   * @param {number} volume L
   */
  function ConcentrationSolution( soluteProperty, soluteAmount, volume ) {

    var thisSolution = this;

    thisSolution.solvent = Solvent.WATER;
    thisSolution.soluteProperty = soluteProperty;
    thisSolution.soluteAmountProperty = new Property( soluteAmount );
    thisSolution.volumeProperty = new Property( volume );

    // derive amount of precipitate (moles)
    thisSolution.precipitateAmountProperty = new DerivedProperty(
      [ thisSolution.soluteProperty, thisSolution.soluteAmountProperty, thisSolution.volumeProperty ],
      function( solute, soluteAmount, volume ) {
        return Math.max( 0, soluteAmount - ( volume * thisSolution.getSaturatedConcentration() ) );
      }
    );

    // derive concentration (M = mol/L)
    thisSolution.concentrationProperty = new DerivedProperty(
      [ thisSolution.soluteProperty, thisSolution.soluteAmountProperty, thisSolution.volumeProperty ],
      function( solute, soluteAmount, volume ) {
        return ( volume > 0 ) ? Math.min( thisSolution.getSaturatedConcentration(), soluteAmount / volume ) : 0;
      }
    );
    Fluid.call( thisSolution, ConcentrationSolution.createColor( thisSolution.solvent, thisSolution.soluteProperty.get(), thisSolution.concentrationProperty.get() ) );

    // derive the solution color
    var updateColor = function() {
      thisSolution.colorProperty.set( ConcentrationSolution.createColor( thisSolution.solvent, thisSolution.soluteProperty.get(), thisSolution.concentrationProperty.get() ) );
    };
    thisSolution.soluteProperty.lazyLink( updateColor );
    thisSolution.concentrationProperty.lazyLink( updateColor );

    // Together Support
    together && together.addComponent( thisSolution.soluteAmountProperty, 'concentrationScreen.solution.soluteAmount' );
    together && together.addComponent( thisSolution.volumeProperty, 'concentrationScreen.solution.volume' );
    together && together.addComponent( thisSolution.precipitateAmountProperty, 'concentrationScreen.solution.precipitateAmount' );
    together && together.addComponent( thisSolution.concentrationProperty, 'concentrationScreen.solution.concentration' );
  }

  return inherit( Fluid, ConcentrationSolution, {

    reset: function() {
      Fluid.prototype.reset.call( this );
      this.soluteAmountProperty.reset();
      this.volumeProperty.reset();
    },

    // convenience function
    getSaturatedConcentration: function() {
      return this.soluteProperty.get().getSaturatedConcentration();
    },

    isSaturated: function() {
      var saturated = false;
      if ( this.volumeProperty.get() > 0 ) {
        saturated = ( this.soluteAmountProperty.get() / this.volumeProperty.get() ) > this.getSaturatedConcentration();
      }
      return saturated;
    },

    getNumberOfPrecipitateParticles: function() {
      var numberOfParticles = Math.round( this.soluteProperty.get().particlesPerMole * this.precipitateAmountProperty.get() );
      if ( numberOfParticles === 0 && this.precipitateAmountProperty.get() > 0 ) {
        numberOfParticles = 1;
      }
      return numberOfParticles;
    }
  }, {
    // static

    /*
     * Creates a color that corresponds to the solution's concentration.
     * @param {Solvent) solvent
     * @param {Solute} solute
     * @param {number} concentration
     * @static
     */
    createColor: function( solvent, solute, concentration ) {
      var color = solvent.colorProperty.get();
      if ( concentration > 0 ) {
        color = solute.colorScheme.concentrationToColor( concentration );
      }
      return color;
    }
  } );
} );

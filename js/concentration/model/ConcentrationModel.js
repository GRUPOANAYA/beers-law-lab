// Copyright 2013-2016, University of Colorado Boulder

/**
 * Model container for the 'Concentration' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Beaker = require( 'BEERS_LAW_LAB/concentration/model/Beaker' );
  var beersLawLab = require( 'BEERS_LAW_LAB/beersLawLab' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ConcentrationMeter = require( 'BEERS_LAW_LAB/concentration/model/ConcentrationMeter' );
  var ConcentrationSolution = require( 'BEERS_LAW_LAB/concentration/model/ConcentrationSolution' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Dropper = require( 'BEERS_LAW_LAB/concentration/model/Dropper' );
  var Evaporator = require( 'BEERS_LAW_LAB/concentration/model/Evaporator' );
  var Faucet = require( 'BEERS_LAW_LAB/concentration/model/Faucet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Precipitate = require( 'BEERS_LAW_LAB/concentration/model/Precipitate' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Shaker = require( 'BEERS_LAW_LAB/concentration/model/Shaker' );
  var ShakerParticles = require( 'BEERS_LAW_LAB/concentration/model/ShakerParticles' );
  var Solute = require( 'BEERS_LAW_LAB/concentration/model/Solute' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BEAKER_VOLUME = 1; // L
  var SOLUTION_VOLUME_RANGE = new Range( 0, BEAKER_VOLUME, 0.5 ); // L
  var SOLUTE_AMOUNT_RANGE = new Range( 0, 6, 0 ); // moles
  var DEFAULT_SOLUTE_AMOUNT = 0; // moles
  var MAX_EVAPORATION_RATE = 0.25; // L/sec
  var MAX_INPUT_FLOW_RATE = 0.25; // L/sec
  var MAX_OUTPUT_FLOW_RATE = MAX_INPUT_FLOW_RATE; // L/sec
  var DROPPER_FLOW_RATE = 0.05; // L/sec
  var SHAKER_MAX_DISPENSING_RATE = 0.2; // mol/sec

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ConcentrationModel( tandem ) {

    var thisModel = this;

    // @public Solutes, in rainbow (ROYGBIV) order.
    thisModel.solutes = [
      Solute.DRINK_MIX,
      Solute.COBALT_II_NITRATE,
      Solute.COBALT_CHLORIDE,
      Solute.POTASSIUM_DICHROMATE,
      Solute.POTASSIUM_CHROMATE,
      Solute.NICKEL_II_CHLORIDE,
      Solute.COPPER_SULFATE,
      Solute.POTASSIUM_PERMANGANATE
    ];

    // @public
    thisModel.soluteProperty = new Property( thisModel.solutes[ 0 ], { tandem: tandem.createTandem( 'soluteProperty' ) } );
    thisModel.soluteFormProperty = new Property( 'solid', { tandem: tandem.createTandem( 'soluteFormProperty' ) } ); // 'solid' or 'solution'

    // @public
    thisModel.solution = new ConcentrationSolution( thisModel.soluteProperty, DEFAULT_SOLUTE_AMOUNT, SOLUTION_VOLUME_RANGE.defaultValue, tandem.createTandem( 'solution' ) );
    thisModel.beaker = new Beaker( new Vector2( 350, 550 ), new Dimension2( 600, 300 ), 1 );
    thisModel.precipitate = new Precipitate( thisModel.solution, thisModel.beaker, tandem.createTandem( 'precipitate' ) );
    thisModel.shaker = new Shaker( new Vector2( thisModel.beaker.location.x, 170 ), new Bounds2( 250, 50, 575, 210 ), 0.75 * Math.PI,
      thisModel.soluteProperty, SHAKER_MAX_DISPENSING_RATE, thisModel.soluteFormProperty.get() === 'solid', tandem.createTandem( 'shaker' ) );
    thisModel.shakerParticles = new ShakerParticles( thisModel.shaker, thisModel.solution, thisModel.beaker, tandem.createTandem( 'shakerParticles' ) );
    thisModel.dropper = new Dropper( new Vector2( thisModel.beaker.location.x, 225 ), new Bounds2( 260, 225, 580, 225 ),
      thisModel.soluteProperty, DROPPER_FLOW_RATE, thisModel.soluteFormProperty.get() === 'solution', tandem.createTandem( 'dropper' ) );
    thisModel.evaporator = new Evaporator( MAX_EVAPORATION_RATE, thisModel.solution, tandem.createTandem( 'evaporator' ) );
    thisModel.solventFaucet = new Faucet( new Vector2( 155, 220 ), -400, 45, MAX_INPUT_FLOW_RATE, tandem.createTandem( 'solventFaucet' ) );
    thisModel.drainFaucet = new Faucet( new Vector2( 750, 630 ), thisModel.beaker.getRight(), 45, MAX_OUTPUT_FLOW_RATE, tandem.createTandem( 'drainFaucet' ) );
    thisModel.concentrationMeter = new ConcentrationMeter( new Vector2( 785, 210 ), new Bounds2( 10, 150, 835, 680 ),
      new Vector2( 750, 370 ), new Bounds2( 30, 150, 966, 680 ), tandem.createTandem( 'concentrationMeter' ) );

    // Things to do when the solute is changed.
    thisModel.soluteProperty.link( function() {
      thisModel.solution.soluteAmountProperty.set( 0 );
    } );

    // Enable faucets and dropper based on amount of solution in the beaker.
    thisModel.solution.volumeProperty.link( function( volume ) {
      thisModel.solventFaucet.enabledProperty.set( volume < SOLUTION_VOLUME_RANGE.max );
      thisModel.drainFaucet.enabledProperty.set( volume > SOLUTION_VOLUME_RANGE.min );
      thisModel.dropper.enabledProperty.set( !thisModel.dropper.emptyProperty.get() && ( volume < SOLUTION_VOLUME_RANGE.max ) );
    } );

    // Empty shaker and dropper when max solute is reached.
    thisModel.solution.soluteAmountProperty.link( function( soluteAmount ) {
      var containsMaxSolute = ( soluteAmount >= SOLUTE_AMOUNT_RANGE.max );
      thisModel.shaker.emptyProperty.set( containsMaxSolute );
      thisModel.dropper.emptyProperty.set( containsMaxSolute );
      thisModel.dropper.enabledProperty.set( !thisModel.dropper.emptyProperty.get() && !containsMaxSolute && thisModel.solution.volumeProperty.get() < SOLUTION_VOLUME_RANGE.max );
    } );
  }

  beersLawLab.register( 'ConcentrationModel', ConcentrationModel );

  return inherit( Object, ConcentrationModel, {

    // @public Resets all model elements
    reset: function() {
      this.soluteProperty.reset();
      this.soluteFormProperty.reset();
      this.solution.reset();
      this.shaker.reset();
      this.shakerParticles.reset();
      this.dropper.reset();
      this.evaporator.reset();
      this.solventFaucet.reset();
      this.drainFaucet.reset();
      this.concentrationMeter.reset();
    },

    /*
     * Moves time forward by the specified amount.
     * @param deltaSeconds clock time change, in seconds.
     * @public
     */
    step: function( deltaSeconds ) {
      this.addSolventFromInputFaucet( deltaSeconds );
      this.drainSolutionFromOutputFaucet( deltaSeconds );
      this.addStockSolutionFromDropper( deltaSeconds );
      this.evaporateSolvent( deltaSeconds );
      this.propagateShakerParticles( deltaSeconds );
      this.createShakerParticles();
    },

    // @private Add solvent from the input faucet
    addSolventFromInputFaucet: function( deltaSeconds ) {
      this.addSolvent( this.solventFaucet.flowRateProperty.get() * deltaSeconds );
    },

    // @private Drain solution from the output faucet
    drainSolutionFromOutputFaucet: function( deltaSeconds ) {
      var drainVolume = this.drainFaucet.flowRateProperty.get() * deltaSeconds;
      if ( drainVolume > 0 ) {
        var concentration = this.solution.concentrationProperty.get(); // get concentration before changing volume
        var volumeRemoved = this.removeSolvent( drainVolume );
        this.removeSolute( concentration * volumeRemoved );
      }
    },

    // @private Add stock solution from dropper
    addStockSolutionFromDropper: function( deltaSeconds ) {
      var dropperVolume = this.dropper.flowRateProperty.get() * deltaSeconds;
      if ( dropperVolume > 0 ) {

        // defer update of precipitateAmount until we've changed both volume and solute amount, see concentration#1
        this.solution.updatePrecipitateAmount = false;
        var volumeAdded = this.addSolvent( dropperVolume );
        this.solution.updatePrecipitateAmount = true;
        this.addSolute( this.solution.soluteProperty.get().stockSolutionConcentration * volumeAdded );
      }
    },

    // @private Evaporate solvent
    evaporateSolvent: function( deltaSeconds ) {
      this.removeSolvent( this.evaporator.evaporationRateProperty.get() * deltaSeconds );
    },

    // @private Propagates solid solute that came out of the shaker
    propagateShakerParticles: function( deltaSeconds ) {
      this.shakerParticles.step( deltaSeconds );
    },

    // @private Creates new solute particles when the shaker is shaken.
    createShakerParticles: function() {
      this.shaker.step();
    },

    // @private Adds solvent to the solution. Returns the amount actually added.
    addSolvent: function( deltaVolume ) {
      if ( deltaVolume > 0 ) {
        var volumeProperty = this.solution.volumeProperty;
        var volumeBefore = volumeProperty.get();
        volumeProperty.set( Math.min( SOLUTION_VOLUME_RANGE.max, volumeProperty.get() + deltaVolume ) );
        return volumeProperty.get() - volumeBefore;
      }
      else {
        return 0;
      }
    },

    // @private Removes solvent from the solution. Returns the amount actually removed.
    removeSolvent: function( deltaVolume ) {
      if ( deltaVolume > 0 ) {
        var volumeProperty = this.solution.volumeProperty;
        var volumeBefore = volumeProperty.get();
        volumeProperty.set( Math.max( SOLUTION_VOLUME_RANGE.min, volumeProperty.get() - deltaVolume ) );
        return volumeBefore - volumeProperty.get();
      }
      else {
        return 0;
      }
    },

    // @private Adds solute to the solution. Returns the amount actually added.
    addSolute: function( deltaAmount ) {
      if ( deltaAmount > 0 ) {
        var amountBefore = this.solution.soluteAmountProperty.get();
        this.solution.soluteAmountProperty.set( Math.min( SOLUTE_AMOUNT_RANGE.max, this.solution.soluteAmountProperty.get() + deltaAmount ) );
        return this.solution.soluteAmountProperty.get() - amountBefore;
      }
      else {
        return 0;
      }
    },

    // @private Removes solute from the solution. Returns the amount actually removed.
    removeSolute: function( deltaAmount ) {
      if ( deltaAmount > 0 ) {
        var amountBefore = this.solution.soluteAmountProperty.get();
        this.solution.soluteAmountProperty.set( Math.max( SOLUTE_AMOUNT_RANGE.min, this.solution.soluteAmountProperty.get() - deltaAmount ) );
        return amountBefore - this.solution.soluteAmountProperty.get();
      }
      else {
        return 0;
      }
    }
  } );
} );

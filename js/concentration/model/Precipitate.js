// Copyright 2013-2015, University of Colorado Boulder

/**
 * The precipitate that forms on the bottom of the beaker.
 * Manages the creation and deletion of precipitate particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var beersLawLab = require( 'BEERS_LAW_LAB/beersLawLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Particles = require( 'BEERS_LAW_LAB/concentration/model/Particles' );
  var PrecipitateParticle = require( 'BEERS_LAW_LAB/concentration/model/PrecipitateParticle' );
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var TPrecipitate = require( 'BEERS_LAW_LAB/concentration/model/TPrecipitate' );

  /**
   * @param {ConcentrationSolution} solution
   * @param {Beaker} beaker
   * @param {Tandem} tandem
   * @constructor
   */
  function Precipitate( solution, beaker, tandem ) {

    Particles.call( this );

    var self = this;

    // @private
    this.solution = solution;
    this.beaker = beaker;

    this.precipitateParticleGroupTandem = tandem.createGroupTandem( 'precipitateParticle' );

    // when the saturation changes, update the number of precipitate particles
    this.solution.precipitateAmountProperty.link( function() {
      self.updateParticles();
    } );

    // when the solute changes, remove all particles and create new particles for the solute
    this.solution.soluteProperty.link( function() {
      self.removeAllParticles();
      self.updateParticles();
    } );

    // Persists for the life of the sim, no need to be disposed
    tandem.addInstance( this, TPrecipitate );
  }

  beersLawLab.register( 'Precipitate', Precipitate );

  // Gets a random orientation, in radians.
  var getRandomOrientation = function() {
    return phet.joist.random.nextDouble() * 2 * Math.PI;
  };

  return inherit( Particles, Precipitate, {

    /*
     * Adds/removes particles to match the model.
     * To optimize performance, clients who register for the 'change' callback will assume that
     * particles are added/removed from the end of the 'particles' array.  See #48.
     * @private
     */
    updateParticles: function() {
      var numberOfParticles = this.solution.getNumberOfPrecipitateParticles(); // number of particles desired after this update
      if ( numberOfParticles === this.particles.length ) {
        // no change, do nothing
        return;
      }
      else if ( numberOfParticles === 0 ) {
        // remove all particles
        this.removeAllParticles();
      }
      else if ( numberOfParticles < this.particles.length ) {
        // remove some particles
        var numberToRemove = this.particles.length - numberOfParticles;
        this.particles.splice( this.particles.length - 1 - numberToRemove, numberToRemove );
      }
      else {
        // add some particles
        while ( numberOfParticles > this.particles.length ) {
          this.particles.push( new PrecipitateParticle(
            this.solution.soluteProperty.get(),
            this.getRandomOffset(),
            getRandomOrientation(),
            this.precipitateParticleGroupTandem.createNextTandem()
          ) );
        }
      }
      assert && assert( this.particles.length === numberOfParticles );
      this.fireChanged();
    },

    // @private (phet-io)
    removeAllParticles: function() {
      for ( var i = 0; i < this.particles.length; i++ ) {
        this.particles[ i ].dispose();
      }
      this.particles = [];
    },

    // @private Notify that the precipitate has changed.
    fireChanged: function() {
      var changedCallbacks = this.changedCallbacks.slice( 0 ); // copy to prevent concurrent modification
      for ( var i = 0; i < changedCallbacks.length; i++ ) {
        changedCallbacks[ i ]( this );
      }
    },

    // @private Gets a random location, in global model coordinate frame.
    getRandomOffset: function() {
      var particleSize = this.solution.soluteProperty.get().particleSize;
      // particles are square, largest margin required is the diagonal length
      var margin = Math.sqrt( particleSize * particleSize );
      // offset
      var x = this.beaker.location.x - ( this.beaker.size.width / 2 ) + margin + ( phet.joist.random.nextDouble() * ( this.beaker.size.width - ( 2 * margin ) ) );
      var y = this.beaker.location.y - margin; // this was tweaked based on the lineWidth used to stroke the beaker
      return new Vector2( x, y );
    }
  } );
} );
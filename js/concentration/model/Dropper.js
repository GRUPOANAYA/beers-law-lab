// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of the dropper, contains solute in solution form (stock solution).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Movable = require( 'BEERS_LAW_LAB/common/model/Movable' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {Vector2} location
   * @param {Bounds2} dragBounds
   * @param {Property.<Solute>} soluteProperty
   * @param {number} maxFlowRate
   * @param {boolean} visible
   * @constructor
   */
  function Dropper( location, dragBounds, soluteProperty, maxFlowRate, visible ) {

    var thisDropper = this;
    Movable.call( thisDropper, location, dragBounds );

    thisDropper.soluteProperty = soluteProperty;
    thisDropper.visibleProperty = new Property( visible );
    thisDropper.dispensingProperty = new Property( false ); // true if the dropper is dispensing solution
    thisDropper.enabledProperty = new Property( true );
    thisDropper.emptyProperty = new Property( false );
    thisDropper.flowRateProperty = new Property( 0 ); // L/sec

    // Turn off the dropper when it's disabled.
    thisDropper.enabledProperty.link( function( enabled ) {
      if ( !enabled ) {
        thisDropper.dispensingProperty.set( false );
      }
    } );

    // Toggle the flow rate when the dropper is turned on/off.
    thisDropper.dispensingProperty.link( function( on ) {
      thisDropper.flowRateProperty.set( on ? maxFlowRate : 0 );
    } );

    // When the dropper becomes empty, disable it.
    thisDropper.emptyProperty.link( function( empty ) {
      if ( empty ) {
        thisDropper.enabledProperty.set( false );
      }
    } );

    // Together support
    together && together.addComponent( this.locationProperty, 'concentrationScreen.dropper.location' );
    together && together.addComponent( thisDropper.dispensingProperty, 'concentrationScreen.dropper.dispensing' );
    together && together.addComponent( thisDropper.emptyProperty, 'concentrationScreen.dropper.empty' );
    together && together.addComponent( thisDropper.flowRateProperty, 'concentrationScreen.dropper.flowRate' );
  }

  return inherit( Movable, Dropper, {
    reset: function() {
      Movable.prototype.reset.call( this );
      this.visibleProperty.reset();
      this.dispensingProperty.reset();
      this.enabledProperty.reset();
      this.emptyProperty.reset();
      this.flowRateProperty.reset();
    }
  } );
} );
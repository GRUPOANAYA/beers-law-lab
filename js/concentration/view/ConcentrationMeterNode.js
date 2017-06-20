// Copyright 2013-2016, University of Colorado Boulder

/**
 * Concentration meter, with probe.
 * The probe registers the concentration of all possible fluids that it may contact, including:
 *
 * - solution in the beaker
 * - output of the solvent faucet
 * - output of the drain faucet
 * - output of the dropper
 *
 * Rather than trying to model the shapes of all of these fluids, we handle 'probe is in fluid'
 * herein via intersection of node shapes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var beersLawLab = require( 'BEERS_LAW_LAB/beersLawLab' );
  var BLLQueryParameters = require( 'BEERS_LAW_LAB/common/BLLQueryParameters' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ProbeNode = require( 'SCENERY_PHET/ProbeNode' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );

  // strings
  var concentrationString = require( 'string!BEERS_LAW_LAB/concentration' );
  var pattern0PercentString = require( 'string!BEERS_LAW_LAB/pattern.0percent' );
  var pattern0Value1UnitsString = require( 'string!BEERS_LAW_LAB/pattern.0value.1units' );
  var unitsMolesPerLiterString = require( 'string!BEERS_LAW_LAB/units.molesPerLiter' );
  var unitsGramesPerLiterString = 'g/L';

  // constants
  var BODY_IS_DRAGGABLE = true;
  var DECIMAL_PLACES_MOLES_PER_LITER = 3;
  var DECIMAL_PLACES_PERCENT = 1;
  var READOUT_NO_VALUE = '-'; // displayed in the readout when the meter is not measuring anything
  var BODY_X_MARGIN = 15;
  var BODY_Y_MARGIN = 15;
  var READOUT_X_MARGIN = 8;
  var READOUT_Y_MARGIN = 4;
  var PROBE_COLOR = 'rgb( 135, 4, 72 )';
  var CONCENTRATION_METER_UNITS = BLLQueryParameters.CONCENTRATION_METER_UNITS;

  /**
   * @param {ConcentrationMeter} meter
   * @param {ConcentrationSolution} solution
   * @param {Dropper} dropper
   * @param {Node} solutionNode
   * @param {Node} stockSolutionNode
   * @param {Node} solventFluidNode
   * @param {Node} drainFluidNode
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function ConcentrationMeterNode( meter, solution, dropper, solutionNode, stockSolutionNode, solventFluidNode,
                                   drainFluidNode, modelViewTransform, tandem ) {

    var thisNode = this;
    Node.call( thisNode );

    var bodyNode = new BodyNode( meter, modelViewTransform, tandem.createTandem( 'bodyNode' ) );
    var probeNode = new ConcentrationProbeNode( meter.probe, modelViewTransform, solutionNode, stockSolutionNode, solventFluidNode, drainFluidNode, tandem.createTandem( 'probeNode' ) );
    var wireNode = new WireNode( meter.body, meter.probe, bodyNode, probeNode );

    // rendering order
    thisNode.addChild( wireNode );
    thisNode.addChild( bodyNode );
    thisNode.addChild( probeNode );

    var updateValue = function() {
      if ( probeNode.isInSolution() || probeNode.isInDrainFluid() ) {
       switch(CONCENTRATION_METER_UNITS) {
         case 'molesPerLiter':
           meter.valueProperty.set(solution.concentrationProperty.get());
           break;
         case 'gramesPerLiter':
           meter.valueProperty.set(solution.concentrationGramesPerLiterProperty.get());
           break;
         default:
           meter.valueProperty.set(solution.percentConcentrationProperty.get());
       }
      }
      else if ( probeNode.isInSolvent() ) {
        meter.valueProperty.set( 0 );
      }
      else if ( probeNode.isInStockSolution() ) {
        switch(CONCENTRATION_METER_UNITS) {
          case 'molesPerLiter':
            meter.valueProperty.set(dropper.soluteProperty.get().stockSolutionConcentration);
            break;
          case 'gramesPerLiter':
            meter.valueProperty.set(dropper.soluteProperty.get().stockSolutionConcentration);
            break;
          default:
            meter.valueProperty.set(dropper.soluteProperty.get().stockSolutionPercentConcentration);
        }
      }
      else {
        meter.valueProperty.set( null );
      }
    };

    meter.probe.locationProperty.link( updateValue );
    solution.soluteProperty.link( updateValue );
    switch(CONCENTRATION_METER_UNITS) {
      case 'molesPerLiter':
        solution.concentrationProperty.link( updateValue );
        break;
      case 'gramesPerLiter':
        solution.concentrationGramesPerLiterProperty.link(updateValue);
        break;
      default:
        solution.percentConcentrationProperty.link( updateValue );
    }
    solutionNode.addEventListener( 'bounds', updateValue );
    stockSolutionNode.addEventListener( 'bounds', updateValue );
    solventFluidNode.addEventListener( 'bounds', updateValue );
    drainFluidNode.addEventListener( 'bounds', updateValue );

    tandem.addInstance( this );
  }

  beersLawLab.register( 'ConcentrationMeterNode', ConcentrationMeterNode );

  /**
   * Meter body, origin at upper left.
   * Note that while the body is a Movable, we have currently decided not to allow it to be moved,
   * so it has no drag handler
   * @param {ConcentrationMeter} meter
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function BodyNode( meter, modelViewTransform, tandem ) {

    var thisNode = this;
    Node.call( thisNode, {
      cursor: 'pointer'
    } );

    var maxTextWidth = 225; // constrain text width for i18n, determined empirically

    // title
    var titleNode = new Text( concentrationString,
      { font: new PhetFont( 18 ), fill: 'white', maxWidth: maxTextWidth } );

    // readout for the value + units
    var formattedText = StringUtils.format(
      pattern0Value1UnitsString,
      Util.toFixed( 1, DECIMAL_PLACES_MOLES_PER_LITER ),
      unitsMolesPerLiterString
    );
    var readoutTextNode = new TandemText( formattedText, {
      font: new PhetFont( 20 ),
      fill: 'black',
      maxWidth: maxTextWidth,
      tandem: tandem.createTandem( 'readoutTextNode' )
    } );
    var readoutWidth = Math.max( titleNode.width, readoutTextNode.width ) + ( 2 * READOUT_X_MARGIN );
    var readoutHeight = readoutTextNode.height + ( 2 * READOUT_Y_MARGIN );
    var readoutBackgroundNode = new ShadedRectangle( new Bounds2( 0, 0, readoutWidth, readoutHeight ), {
      baseColor: 'white',
      lightSource: 'rightBottom'
    } );
    readoutTextNode.right = readoutBackgroundNode.right - READOUT_X_MARGIN;
    readoutTextNode.bottom = readoutBackgroundNode.bottom - READOUT_Y_MARGIN;

    // vertical arrangement of stuff in the meter
    var vBox = new LayoutBox( {
      children: [ titleNode, new Node( { children: [ readoutBackgroundNode, readoutTextNode ] } ) ],
      orientation: 'vertical',
      align: 'center',
      spacing: 18
    } );

    // meter body
    var bodyWidth = vBox.width + ( 2 * BODY_X_MARGIN );
    var bodyHeight = vBox.height + ( 2 * BODY_Y_MARGIN );
    var bodyNode = new ShadedRectangle( new Bounds2( 0, 0, bodyWidth, bodyHeight ), {
      baseColor: PROBE_COLOR,
      lightOffset: 0.95
    } );

    thisNode.addChild( bodyNode );
    thisNode.addChild( vBox );
    vBox.center = bodyNode.center;

    if ( BODY_IS_DRAGGABLE ) {
      var movableDragHandler = new MovableDragHandler( meter.body.locationProperty, {
        tandem: tandem.createTandem( 'movableDragHandler' ),
        dragBounds: meter.body.dragBounds,
        modelViewTransform: modelViewTransform
      } );
      thisNode.addInputListener( movableDragHandler );

      // no corresponding removeInstance is needed because this object exists for the lifetime of the sim
      tandem.addInstance( this );
    }

    // body location
    meter.body.locationProperty.link( function( location ) {
      thisNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

    // when the value changes, update the readout
    meter.valueProperty.link( function( value ) {

      if ( value === null ) {
        readoutTextNode.setText( READOUT_NO_VALUE );
        readoutTextNode.centerX = readoutBackgroundNode.centerX; // center justified
      }
      else {

        // display concentration as 'mol/L' or '%', see beers-law-lab#149
        var readoutText = null;
        switch(CONCENTRATION_METER_UNITS) {
          case 'molesPerLiter':
            readoutText = StringUtils.format( pattern0Value1UnitsString, Util.toFixed( value, DECIMAL_PLACES_MOLES_PER_LITER ), unitsMolesPerLiterString );
            break;
          case 'gramesPerLiter':
            readoutText = StringUtils.format( pattern0Value1UnitsString, Util.toFixed( value, DECIMAL_PLACES_MOLES_PER_LITER ), unitsGramesPerLiterString );
            break;
          default:
            readoutText = StringUtils.format( pattern0PercentString, Util.toFixed( value, DECIMAL_PLACES_PERCENT ) );
        }
        readoutTextNode.setText( readoutText );
        readoutTextNode.right = readoutBackgroundNode.right - READOUT_X_MARGIN; // right justified
      }
    } );
  }

  beersLawLab.register( 'ConcentrationMeterNode.BodyNode', BodyNode );

  inherit( Node, BodyNode );

  /**
   * Meter probe, origin at center of crosshairs.
   * @param {Movable} probe
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Node} solutionNode
   * @param {Node} stockSolutionNode
   * @param {Node} solventFluidNode
   * @param {Node} drainFluidNode
   * @param {Tandem} tandem
   * @constructor
   */
  function ConcentrationProbeNode( probe, modelViewTransform, solutionNode, stockSolutionNode, solventFluidNode, drainFluidNode, tandem ) {

    var thisNode = this;

    ProbeNode.call( thisNode, {
      sensorTypeFunction: ProbeNode.crosshairs( {
        intersectionRadius: 6
      } ),
      radius: 34,
      innerRadius: 26,
      handleWidth: 30,
      handleHeight: 25,
      handleCornerRadius: 12,
      lightAngle: 1.75 * Math.PI,
      color: PROBE_COLOR,
      rotation: -Math.PI / 2,
      cursor: 'pointer'
    } );

    // probe location
    probe.locationProperty.link( function( location ) {
      thisNode.translation = modelViewTransform.modelToViewPosition( location );
    } );

    // touch area
    thisNode.touchArea = thisNode.localBounds.dilatedXY( 0.25 * thisNode.width, 0.25 * thisNode.height );

    // drag handler
    var movableDragHandler = new MovableDragHandler( probe.locationProperty, {
      tandem: tandem.createTandem( 'movableDragHandler' ),
      dragBounds: probe.dragBounds,
      modelViewTransform: modelViewTransform
    } );
    thisNode.addInputListener( movableDragHandler );

    var isInNode = function( node ) {
      var localPoint = node.parentToLocalPoint( probe.locationProperty.get() );
      var nodeShape = node.getShape();
      var shapeBounds = nodeShape.bounds;
      return shapeBounds.getWidth() > 0 && shapeBounds.getHeight() > 0 && nodeShape.containsPoint( localPoint ); // see issue #65
    };

    thisNode.isInSolution = function() {
      return isInNode( solutionNode );
    };

    thisNode.isInSolvent = function() {
      return isInNode( solventFluidNode );
    };

    thisNode.isInDrainFluid = function() {
      return isInNode( drainFluidNode );
    };

    thisNode.isInStockSolution = function() {
      return isInNode( stockSolutionNode );
    };

    // no corresponding removeInstance is needed because this object exists for the lifetime of the sim
    tandem.addInstance( this );
  }

  beersLawLab.register( 'ConcentrationMeterNode.ConcentrationProbeNode', ConcentrationProbeNode );

  inherit( Node, ConcentrationProbeNode );

  /**
   * Wire that connects the body and probe.
   * @param {Movable} body
   * @param {Movable} probe
   * @param {Node} bodyNode
   * @param {Node} probeNode
   * @constructor
   */
  function WireNode( body, probe, bodyNode, probeNode ) {

    var thisNode = this;
    Path.call( thisNode, new Shape(), {
      stroke: 'gray',
      lineWidth: 8,
      lineCap: 'square',
      lineJoin: 'round',
      pickable: false // no need to drag the wire, and we don't want to do cubic-curve intersection here, or have it get in the way
    } );

    var updateCurve = function() {

      // Connect bottom-center of body to right-center of probe.
      var bodyConnectionPoint = new Vector2( bodyNode.centerX, bodyNode.bottom - 10 );
      var probeConnectionPoint = new Vector2( probeNode.right, probeNode.centerY );

      // control points
      // The y coordinate of the body's control point varies with the x distance between the body and probe.
      var c1Offset = new Vector2( 0, Util.linear( 0, 800, 0, 200, bodyNode.centerX - probeNode.left ) ); // x distance -> y coordinate
      var c2Offset = new Vector2( 50, 0 );
      var c1 = new Vector2( bodyConnectionPoint.x + c1Offset.x, bodyConnectionPoint.y + c1Offset.y );
      var c2 = new Vector2( probeConnectionPoint.x + c2Offset.x, probeConnectionPoint.y + c2Offset.y );

      thisNode.shape = new Shape()
        .moveTo( bodyConnectionPoint.x, bodyConnectionPoint.y )
        .cubicCurveTo( c1.x, c1.y, c2.x, c2.y, probeConnectionPoint.x, probeConnectionPoint.y );
    };
    body.locationProperty.link( updateCurve );
    probe.locationProperty.link( updateCurve );
  }

  beersLawLab.register( 'ConcentrationMeterNode.WireNode', WireNode );

  inherit( Path, WireNode );

  return inherit( Node, ConcentrationMeterNode );
} );

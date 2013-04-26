// Copyright 2002-2013, University of Colorado

/**
 * View for the "Concentration" module.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function ( require ) {
  "use strict";

  // imports
  var BeakerNode = require( "concentration/view/BeakerNode" );
  var BLLStrings = require( "common/BLLStrings" );
  var Bounds2 = require( "DOT/Bounds2" );
  var ButtonNode = require( "common/view/ButtonNode" );
  var ConcentrationMeterNode = require( "concentration/view/ConcentrationMeterNode" );
  var DOM = require( "SCENERY/nodes/DOM" );
  var Dimension2 = require( "DOT/Dimension2" );
  var DropperNode = require( "concentration/view/DropperNode" );
  var EvaporatorNode = require( "concentration/view/EvaporatorNode" );
  var FaucetFluidNode = require( "concentration/view/FaucetFluidNode" );
  var FaucetNode = require( "concentration/view/FaucetNode" );
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var TabView = require( 'JOIST/TabView' );
  var PrecipitateNode = require( "concentration/view/PrecipitateNode" );
  var Range = require( "DOT/Range" );
  var ResetAllButtonNode = require( "common/view/ResetAllButtonNode" );
  var Scene = require( "SCENERY/Scene" );
  var ShakerNode = require( "concentration/view/ShakerNode" );
  var ShakerParticlesNode = require( "concentration/view/ShakerParticlesNode" );
  var Solute = require( "concentration/model/Solute" );
  var SoluteControlsNode = require( "concentration/view/SoluteControlsNode" );
  var SolutionNode = require( "concentration/view/SolutionNode" );
  var StockSolutionNode = require( "concentration/view/StockSolutionNode" );
  var Text = require( "SCENERY/nodes/Text" );

  /**
   * @param {ConcentrationModel} model
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function ConcentrationView( model, mvt ) {

    var thisView = this;
    TabView.call( thisView );

    // Beaker and stuff inside it
    var beakerNode = new BeakerNode( model.beaker, mvt );
    var solutionNode = new SolutionNode( model.solution, model.beaker, mvt );
    var precipitateNode = new PrecipitateNode( model.precipitate, model.beaker, mvt );

    // Shaker
    var shakerNode = new ShakerNode( model.shaker, mvt );
    var shakerParticlesNode = new ShakerParticlesNode( model.shakerParticles, mvt );

    // Dropper
    var dropperNode = new DropperNode( model.dropper, model.solution.solvent, model.solution.solute, mvt );
    var stockSolutionNode = new StockSolutionNode( model.solution.solvent, model.solute, model.dropper, model.beaker, DropperNode.TIP_WIDTH, mvt );

    // faucets
    var solventFaucetNode = new FaucetNode( model.solventFaucet, mvt );
    var drainFaucetNode = new FaucetNode( model.drainFaucet, mvt );
    var SOLVENT_FLUID_HEIGHT = model.beaker.location.y - model.solventFaucet.location.y;
    var DRAIN_FLUID_HEIGHT = 1000; // tall enough that resizing the play area is unlikely to show bottom of fluid
    var solventFluidNode = new FaucetFluidNode( model.solventFaucet, model.solution.solvent, SOLVENT_FLUID_HEIGHT, mvt );
    var drainFluidNode = new FaucetFluidNode( model.drainFaucet, model.solution, DRAIN_FLUID_HEIGHT, mvt );

    // Concentration meter
    var concentrationMeterNode = new ConcentrationMeterNode( model.concentrationMeter, model.solution, model.dropper, model.solventFaucet, model.drainFaucet,
                                                             solutionNode, stockSolutionNode, solventFluidNode, drainFluidNode, mvt );

    // Solute controls
    var soluteControlsNode = new SoluteControlsNode( model.solutes, model.solute, model.shaker, model.dropper );

    // Evaporator
    var evaporator = new EvaporatorNode( model.evaporator );

    // Remove Solute button
    var removeSoluteButtonNode = new ButtonNode( BLLStrings.removeSolute, function () {
      model.solution.soluteAmount.set( 0 );
    } );

    // Reset All button
    var resetAllButtonNode = new ResetAllButtonNode( function() {
      model.reset();
    } );

    // Rendering order
    thisView.addChild( solventFluidNode );
    thisView.addChild( solventFaucetNode );
    thisView.addChild( drainFluidNode );
    thisView.addChild( drainFaucetNode );
    thisView.addChild( stockSolutionNode );
    thisView.addChild( solutionNode );
    thisView.addChild( beakerNode.mutate( { layerSplit: true } ) ); //TODO experiment to put static nodes in their own layer
    thisView.addChild( precipitateNode );
    thisView.addChild( shakerParticlesNode );
    thisView.addChild( shakerNode );
    thisView.addChild( dropperNode );
    thisView.addChild( concentrationMeterNode );
    thisView.addChild( evaporator );
    // Add anything containing interactive DOM elements last, or they will not receive events.
    thisView.addChild( removeSoluteButtonNode );
    thisView.addChild( resetAllButtonNode );
    thisView.addChild( soluteControlsNode );

    // Layout for things that don't have a location in the model.
    soluteControlsNode.right = concentrationMeterNode.right;
    soluteControlsNode.top = 20;
    evaporator.left = mvt.modelToViewPosition( model.beaker.location ).x - mvt.modelToViewDeltaX( model.beaker.size.width / 2 );
    evaporator.top = beakerNode.bottom + 30;
    removeSoluteButtonNode.left = evaporator.right + 30;
    removeSoluteButtonNode.centerY = evaporator.centerY;
    resetAllButtonNode.left = drainFaucetNode.right + 10;
    resetAllButtonNode.top = drainFaucetNode.bottom + 5;
  }

  inherit( ConcentrationView, TabView, { layoutBounds: new Bounds2( 0, 0, 1024, 700 ) } );

  return ConcentrationView;
} );

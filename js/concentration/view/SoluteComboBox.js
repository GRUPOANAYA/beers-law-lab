// Copyright 2002-2013, University of Colorado

/**
 * Combo box for choosing a solute.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  "use strict";

  // imports
  var assert = require( "ASSERT/assert" )( "beers-law-lab" );
  var BLLFont = require( "common/BLLFont" );
  var BLLStrings = require( "common/BLLStrings" );
  var ComboBoxItem = require( "common/view/ComboBoxItem" );
  var ComboBox = require( "common/view/ComboBox" );
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var Rectangle = require( "SCENERY/nodes/Rectangle" );
  var StringUtils = require( "common/util/StringUtils" );
  var Text = require( "SCENERY/nodes/Text" );

  /**
   * An item in the combo box.
   * @param {Solute} solute
   * @constructor
   */
  function Item( solute ) {

    // node
    var node = new Node();
    var colorNode = new Rectangle( 0, 0, 20, 20, { fill: solute.colorScheme.maxColor, stroke: solute.colorScheme.maxColor.darkerColor() } );
    var textNode = new Text( solute.name, { font: new BLLFont( 20 ) } );
    node.addChild( colorNode );
    node.addChild( textNode );
    textNode.left = colorNode.right + 5;
    textNode.centerY = colorNode.centerY;

    ComboBoxItem.call( this, node, solute );
  }

  inherit( Item, ComboBoxItem );

  /**
   * @param {Array<Solute>} solutes
   * @param {Property<Solute>} selectedSolute
   * @param {Node} soluteListParent
   * @constructor
   */
  function SoluteComboBox( solutes, selectedSolute, soluteListParent ) {

    // "Solute" label
    var labelNode = new Text( StringUtils.format( BLLStrings.pattern_0label, [ BLLStrings.solute ] ),
                              { font: new BLLFont( 22 ) } );

    // items
    var items = [];
    for ( var i = 0; i < solutes.length; i++ ) {
      var solute = solutes[i];
      items[i] = new Item( solute );
    }

    ComboBox.call( this, items, selectedSolute,
                   { labelNode: labelNode,
                     listPosition: "below",
                     itemHighlightFill: "rgb(218,255,255)",
                     listParent: soluteListParent } );
  }

  inherit( SoluteComboBox, ComboBox );

  return SoluteComboBox;
} );
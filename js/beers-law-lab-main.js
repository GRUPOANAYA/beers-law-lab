// Copyright 2002-2013, University of Colorado

/**
 * Main entry point for the "Beer's Law Lab" sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
require(
  [
    "JOIST/Sim",
    "concentration/ConcentrationTab",
    "beerslaw/BeersLawTab",
    "i18n!../nls/beers-law-lab-strings"
  ],
  function ( Sim, ConcentrationTab, BeersLawTab, strings ) {
    "use strict";
    new Sim( strings.beersLawLab, [ new ConcentrationTab( strings ), new BeersLawTab( strings ) ] ).start();
  } );

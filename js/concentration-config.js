// Copyright 2002-2013, University of Colorado

/*
 * RequireJS configuration file for the "Concentration" sim.
 * Paths are relative to the location of this file.
 *
 * @author Chris Malley
 */
requirejs.config(
  {
    deps: ["concentration-main"],

    config: {
      i18n: {
        locale: "en_us"
      }
    },

    paths: {

      // contrib
      easel: "../contrib/easeljs-0.6.0.min",
      i18n: "../contrib/i18n-2.0.2",
      image: "../contrib/image-0.2.1",
      tpl: "../contrib/tpl-0.2",

      // Common repos, uppercase names to identify them in require imports
      'EASEL-PHET': "../../easel-phet/js",
      PHETCOMMON: "../../phetcommon/js",

      // Common dependencies
      stats: "../../phetcommon/contrib/stats-r11",

      // Scenery and its dependencies
      ASSERT: '../../scenery/common/assert/js',
      DOT: '../../scenery/common/dot/js',
      SCENERY: '../../scenery/js'
    },

    shim: {
      easel: { exports: "createjs" },
      underscore: { exports: "_" },
      jquery: { exports: "$" },
      stats: { exports: "Stats" }
    },

    urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts
  } );
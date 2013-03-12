// Copyright 2002-2013, University of Colorado

define(
  [],
  function () {

    function StringUtils() {
    }

    /*
     * Similar to Java's MessageFormat.
     * Eg, StringUtils.format( "{0} + {1}", [2,3] ) -> "2 + 3"
     *
     * @param pattern pattern string, with {N} placeholders where N is an integer
     * @param args values to be substituted for placeholders in pattern
     */
    StringUtils.format = function ( pattern, args ) {
      return pattern.replace( /\{(\d+)\}/g, function () {
        return args[arguments[1]];
      } );
    };

    return StringUtils;
  } );

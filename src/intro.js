(function ( window, factory ) {

	var Class = factory( window );

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// CMD module
		module.exports = Class;
	} else if ( typeof define === "function" && define.amd ) {
		// AMD module
		define( "Class", [], function() {
			return Class;
		});
	}

}(this, function ( window, undefined ) {

	"use strict";
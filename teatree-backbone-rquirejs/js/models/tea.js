define([
	'underscore',
	'backbone'
], function ( _, Backbone ) {
	'use strict';
	
	var Tea = Backbone.Model.extend({
		// Specify a urlRoot when using a model outside 
		// of a collection (like when deleteTea), to enable the 
		// default url function to generate URLs based 
		// on the model id. "[urlRoot]/id"
		urlRoot: "./api/teas",
		defaults: {
			"id"       : null,
			"brand"    : "brand name",
			"name"     : "tea name",
			"serving"  : "serving",
			"servings" : 0,
			"ingredients": "",
			"description": "",
			"picture"  : "blank-photo.jpg"
		}
	});
	
	return Tea;
});
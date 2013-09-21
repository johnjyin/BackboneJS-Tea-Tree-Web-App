define([
	'jquery',
	'underscore',
	'backbone',
	'models/tea'
], function ( $, _, Backbone, Tea) {
	'use strict';

	var Teas = Backbone.Collection.extend({
		model: Tea,
		// Set the url property (or function) on a collection 
		// to reference its location on the server. 
		url: "./api/teas"  
	});
	
	return Teas;
	
});
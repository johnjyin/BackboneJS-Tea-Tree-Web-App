define([
	'jquery',
	'underscore',
	'backbone',
	'collections/teas',
	'models/tea',
	'views/header',
	'views/tealist',
	'views/teadetails'
], function ( $, _, Backbone, Teas, Tea, HeaderView, TeaListView, TeaView) {
	'use strict';
	
	// Router
	var TeaApp = Backbone.Router.extend({
		
        routes: {
			""			:		"list",
			"teas/new"	:		"newTea",
            "teas/:id"	:		"teaDetails"
        },

		initialize: function () {
			
        },
		
		list: function () {

			this.teaList = new Teas;
			// When the model data returns from the server, it uses set to 
			// (intelligently) merge the fetched models, unless you pass 
			// {reset: true}, in which case the collection will be reset.
			this.teaList.fetch();
			 
			// Initialize the application view
			// When creating a new View, the options passed,like model, 
			// collection, etc. are attached to the view as 'this.options' 
			// for future reference
			this.teaListView = new TeaListView({collection: this.teaList}); 
			
			$('#nav').html(this.teaListView.render().el);
		},

        teaDetails: function ( id ) {
            this.tea = this.teaList.get(id);
            this.teaView = new TeaView( { model:this.tea } );
            $('#content').html( this.teaView.render().el );
        },
		
		newTea: function ( event ) {
            //if (app.teaView) app.teaView.close();
            this.teaView = new TeaView( { model: new Tea() } );
            $('#content').html( this.teaView.render().el );
            return false;
        }
	});
	
	return TeaApp;
});
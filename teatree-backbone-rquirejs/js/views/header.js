define([
	'jquery',
	'underscore',
	'backbone',
	'routers/router',
	'text!templates/header.html'
], function ( $, _, Backbone, TeaApp, headerTemplate ) {
	'use strict';

	var HeaderView = Backbone.View.extend({

        template:_.template( headerTemplate ),

        initialize:function () {
            this.render();
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            return this;
        },

        events:{
            "click .new": "newTeaEvent"
        },
		
        newTeaEvent:function (event) {
            teaApp.navigate('teas/new', true);
			return false;
        }

	});
	
	return HeaderView;
});
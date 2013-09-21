define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/tealistitem.html'
], function ($, _, Backbone, teaListItemTemplate) {
	'use strict';

	var TeaListItemView = Backbone.View.extend({

        tagName:"li",
        template:_.template(teaListItemTemplate),
		
		initialize: function () {
			this.cid = 'view_' + this.model.cid;
			this.model.on("change", this.render, this);
			//this.model.on("destroy", this.close, this);
		},
		
        render:function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
			// To identify the associated view of each model
			// by model's instance reference (cid) rather attributes.
			// $(this.el).attr('view-cid', this.model.cid);
            return this;
        },
		
		close: function () {
			// Remove all callback functions
			$(this.el).unbind();
			// Remove the view from DOM
			$(this.el).remove();
		}
	});
	
	return TeaListItemView;
});

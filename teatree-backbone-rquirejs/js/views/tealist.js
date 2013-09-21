define([
	'jquery',
	'underscore',
	'backbone',
	'collections/teas',
	'views/tealistitem'
], function ( $, _, Backbone,  Teas, TeaListItemView ) {

	var TeaListView = Backbone.View.extend({	
        tagName:'ul',
		
        initialize:function () {
			// When the model data returns from the server, it uses set to 
			// (intelligently) merge the fetched models, unless you pass 
			// {reset: true}, in which case the collection will be reset.			
			this.collection.on("reset", this.render, this);			
			
			var self = this;

			this.teaListItemViews = [];
			// be triggered when new model created
			//    object.on(event, callback, [context]) Alias: bind 
			this.collection.on("add", function(tea) {
				teaListItemView = new TeaListItemView({model:tea});
				$(self.el).append( teaListItemView.render().el );
				self.teaListItemViews [ tea.cid ] = teaListItemView;
			});
			
			this.collection.on("remove", function(tea, options) {
				// this == collection (has deleted models)
				// self.$('[view-cid="' + tea.cid + '"]').remove();
				self.teaListItemViews[ tea.cid ].close();
				delete self.teaListItemViews[ tea.cid ];
			});
        },
    
		// Override view default render function with your code 
		// that renders the view template from model data, and 
		// updates this.el with the new HTML.
        render:function (eventName) {
		    // Underscore function: _.each()   
            _.each(this.collection.models, function (tea) { 
				// All views have a DOM element at all times 
				// which can be accessed by 'this.el'		
                $(this.el).append(new TeaListItemView({model:tea}).render().el); 
            }, this);
			
			// A good convention is to return this at the end of 
			// render to enable chained calls.
            return this;
        }
	});
	
	return TeaListView;
});
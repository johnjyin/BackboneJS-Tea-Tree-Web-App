// Models
window.Tea = Backbone.Model.extend({
	// Specify a urlRoot when using a model outside 
	// of a collection (like when deleteTea), to enable the 
	// default url function to generate URLs based 
	// on the model id. "[urlRoot]/id"
	urlRoot:"./api/teas",
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

window.TeaCollection = Backbone.Collection.extend({
    model:Tea,
	// Set the url property (or function) on a collection 
	// to reference its location on the server. 
    url:"./api/teas"  
});


// Views
window.TeaListView = Backbone.View.extend({	
    tagName:'ul',
	
    initialize:function () {

		var self = this;
		this.teaListItemViews = {};
		// be triggered when new model created
		//    object.on(event, callback, [context]) Alias: bind 
		this.collection.on("add", function(tea) {
			teaListItemView = new TeaListItemView({model:tea});
			$(self.el).append( teaListItemView.render().el );
			self.teaListItemViews[ tea.cid ] = teaListItemView;
		});
		
		this.collection.on("remove", function(tea, options) {
			// this == collection (has deleted models)
			// self.$('[view-cid="' + model.cid + '"]').remove();
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

window.TeaListItemView = Backbone.View.extend({

    tagName:"li",
    template:_.template($('#tpl-tea-list-item').html()),
	
	initialize: function () {
		this.cid = this.model.cid;
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

window.TeaView = Backbone.View.extend({

    template:_.template($('#tpl-tea-details').html()),

	initialize: function () {
		this.model.on("destroy", this.close, this);
		//this.model.on("change", this.render, this);
	},
	
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
		return this;
    },
	
	// Using delegateEvents provides a number of advantages 
	// over manually using jQuery to bind events to child 
	// elements during render.
	// The Backbone events hash allows us to attach event 
	// listeners to either el-relative custom selectors, or 
	// directly to el if no selector is provided. An event takes
	// the form of a key-value pair 
	// 'eventName selector': 'callbackFunction' and a number of 
	// DOM event-types are supported, including click, submit, 
	// mouseover, dblclick and more.
    events:{
        "click .save"  				:	"saveTea", // upload photo first, 
													// then save any change
        "click .delete"				:	"deleteTea",
		"change #changephoto"		:	"changePhoto",// listen changephoto event
		"drop #teaphoto"			:	"dropPhoto",  // listen drop events
		"dragover #teaphoto"		: 	function(e) {
			e.preventDefault();
		}
    },

	saveTea: function () {
		
		this.model.set({
            name:$('#name').val(),
            brand:$('#brand').val(),
            serving:$('#serving').val(),
            servings:$('#servings').val(),
            ingredients:$('#ingredients').val(),
            description:$('#description').val()
        });
		var self = this;
        if (this.pictureFile) {
			//console.log( this.pictureFile.name);
            this.model.set("picture", this.pictureFile.name);
			
			// append photo into FormData object 
			var fileData = new FormData();
			fileData.append('file', this.pictureFile);
			
			// upload FormData object by XMLHttpRequest
			$.ajax({
				url: 'api/upload.php',
				type: 'POST',
				data: fileData,
				processData: false,
				cache: false,
				contentType: false
			})
			.done(function () {
				console.log(self.pictureFile.name + ' uploaded successfully !' );
			})
			.fail(function () {
				console.log('Error! An error occurred while uploading ' 
					+ self.pictureFile.name + ' !' );
				return false;
			});
        };
		
        if (self.model.isNew()) {
			// Equivalent to instantiating a model with a hash of 
			// attributes, saving the model to the server, and adding 
			// the model to the set after being successfully created.
			// Creating a model will trigger an immediate "add" event 
			// on the collection, a "request" event as the new model 
			// is sent to the server, as well as a "sync" event, once
			// the server has responded with the successful creation
			// of the model.
            app.teaList.create( self.model, {
					success: function() {
						console.log('Successful create & save model (id: ' 
							+ self.model.id + ' )');
						app.navigate('wines/'+self.model.id, false);
					}
			});
        } else {
			// Save model to database (or alternative persistence layer), 
			// by delegating to Backbone.sync. 
            self.model.save();
			console.log('Successful update model (id: ' + self.model.id + ' )');
        }
		return true;

    },

    deleteTea:function () {
		// Destroys the model on the server by delegating 
		// an HTTP DELETE request to Backbone.sync.
		var self = this;
        this.model.destroy({
            success: function (model) {
				// delete new created model: id == null
                 console.log('Tea (' + self.model.id + ') deleted successfully');
				// $(this.el).unbind();
				// Remove the view from DOM
				// $(this.el).remove();
                // app.navigate('/', true);
            }
        });
		self.close();
		app.navigate('/', false);
        return false;
    },

	changePhoto:function (event) {
		// Prevents the event from bubbling up the DOM tree.
        event.stopPropagation();
		// To prevent the browser default handling of the data: 
		// default is open as link on drop.
        event.preventDefault();
		
		var newFile = event.target.files[0];
		if( ! newFile.type.match(/image.*/i) ){
			alert('Insert an image!');
		} else {
			this.pictureFile = newFile;
			// Read the image file from the local file system 
			// and display it in the img tag.
			var reader = new FileReader();
			reader.onloadend = function () {
				$('#teaphoto').attr('src', reader.result);
			};
			reader.readAsDataURL(this.pictureFile);
		}
		return false;
	},
	
	dropPhoto: function (event) {
        event.stopPropagation();
        event.preventDefault();
		
		var e = event.originalEvent;
		// The DataTransfer object holding the data.
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system 
		// and display it in the img tag.
        var reader = new FileReader();
        reader.onloadend = function () {
            $('#teaphoto').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
		return false;
    },
	
	close: function () {
		// Remove all callback functions
		$(this.el).unbind();
		// Remove the view from DOM
		$(this.el).remove();
	}
	
});

window.HeaderView = Backbone.View.extend({

    template:_.template($('#tpl-header').html()),

    initialize:function () {
        this.render();
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events: {
    //    "click .new": "newTeaEvent"
    },
	
    newTeaEvent:function (event) {
        app.navigate('teas/new', true);
		return false;
    }

});


// Router
window.AppRouter = Backbone.Router.extend({

    routes:{
        "":				"list",
		"newtea":		"newTea",
        "teas/:id":		"teaDetails"
    },

	initialize:function () {
        $('#header').html(new HeaderView().render().el);
    },
	
    list:function () {
        this.teaList = new TeaCollection();
		
		// When the model data returns from the server, it uses set to 
		// (intelligently) merge the fetched models, unless you pass 
		// {reset: true}, in which case the collection will be reset.
        this.teaList.fetch();
		
		// When creating a new View, the options passed,like model, 
		// collection, etc. are attached to the view as 'this.options' 
		// for future reference
        this.teaListView = new TeaListView({collection:this.teaList}); 
		
        $('#nav').html(this.teaListView.render().el);
		
    },

    teaDetails: function (id) {
        this.tea = this.teaList.get(id);
        this.teaView = new TeaView({model:this.tea});
        $('#content').html(this.teaView.render().el);
		$.mobile.changePage( $('#tea-details') ); 
    },
	
	newTea: function (event) {
        //if (app.teaView) app.teaView.close();
        this.teaView = new TeaView( { model: new Tea() } );
        $('#newtea-content').html( this.teaView.render().el );
		$.mobile.changePage( $('#new-tea') ); 
    }
	
});

var app = new AppRouter();

// When all of Routers have been created, and all routes are set up 
// properly, call Backbone.history.start() to begin monitoring 
// hashchange events, dispatching routes.
Backbone.history.start();


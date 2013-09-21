define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/teadetails.html'
], function ( $, _, Backbone, TeaDetailsTemplate) {

	var TeaView = Backbone.View.extend({

        template:_.template( TeaDetailsTemplate ),

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
                teaApp.teaList.create( self.model, {
						success: function() {
							console.log('Successful create & save model (id: ' 
								+ self.model.id + ' )');
							teaApp.navigate('wines/'+self.model.id, false);
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
			teaApp.navigate('/', false);
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
	
	return TeaView;

});
require.config({
	deps: ['main'],
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../lib/jquery/jquery-2.0.3',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		text: '../lib/requirejs-text/text'
	}
});

require([
	'jquery',
	'underscore',
	'backbone',
	'routers/router',
	'views/header'
], function ( $, _, Backbone, TeaApp, HeaderView ) {
	// Initialize routing and start Backbone.history()
	teaApp = new TeaApp();
	Backbone.history.start();
	
	$('#header').html( new HeaderView().render().el );
	
	
});



require.config({
	/* urlArgs: "bust=" + (new Date()).getTime(), */
	paths: {
		"jquery": "https://code.jquery.com/jquery-latest.min.js",
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
		"backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"
	},
	urlArgs: "v=" +  (new Date()).getTime(),
	shim:{
		'jquery': {
			exports: 'jQuery'
		},
		'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
		}
	}
});

require([ 'backbone', 'views/app', "plugins/transit"], function( Backbone, AppView) {
	// register global namespace
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Routers: {},
		Vent: _.extend({}, Backbone.Events),
		States: {}
	};

	window.App.Views.Main = new AppView();

	Backbone.history.start({ 'pushState': true });
});

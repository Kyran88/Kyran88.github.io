require.config({
	/* urlArgs: "bust=" + (new Date()).getTime(), */
	paths: {
		"jquery": "vendor/jquery/dist/jquery.min",
		"underscore": "vendor/underscore-amd/underscore-min",
		"backbone": "vendor/backbone-amd/backbone-min"
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

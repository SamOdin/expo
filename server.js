
var loadModule = 'expo/server';

dojoConfig = {
	baseUrl: 'src/',
	async: 1,

	hasCache: {
		'host-node': 1,
		'dom': 0
	},

	packages: [{
		name: 'dojo',
		location: 'dojo'
	}, {
		name: 'expo',
		location: 'expo'
	}],

	deps: [ loadModule ]
};

require('./src/dojo/dojo.js');

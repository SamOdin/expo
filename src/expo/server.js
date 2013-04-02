define([
	'dojo/node!express',
	'dojo/node!jade',
	'dojo/node!stylus',
	'dojo/node!nib',
	'dojo/node!colors'
], function (express, jade, stylus, nib) {

	/*jshint node:true */

	function compile(str, path) {
		return stylus(str).set('filename', path).use(nib());
	}

	var app = express(),
		appPort = process.env.PORT || 8088,
		env = process.env.NODE_ENV || 'development';

	app.configure(function () {
		app.locals.pretty = true;
		app.set('view engine', 'jade');
		app.set('views', 'views');
		app.use(express.logger(env && env === 'production' ? null : 'dev'));
		app.use(express.compress());
		app.use(express.cookieParser());
		app.use(express.cookieSession({ secret: 'Dgjru6QoLavJTqUtImJRQiJN5S4Qqaanxc1R5wbZ'}));
		app.use(express.bodyParser());
		app.use(app.router);

		app.use(stylus.middleware({
			src: '.',
			compile: compile,
			compress: true
		}));

		app.use('/src', express.static('src'));
		app.use('/css', express.static('css'));

		app.use('/500', function (request, response, next) {
			next(new Error('All your base are belong to us!'));
		});

		app.use(function (request, response) {
			response.status(404); // Not Found
			response.render('404', {
				url: request.url
			});
		});

		app.use(function (error, request, response) {
			response.status(error.status || 500);
			response.render('500', {
				error: error
			});
		});
	});

	app.all('/', function (request, response) {
		response.render('index');
	});

	app.get('/test', function (request, response) {
		response.redirect('/src/dojo2-teststack/client.html?config=d2-proto/test/config&suites=d2-proto/test/parser/comparison');
	});

	app.listen(appPort);
	console.log('HTTP server started on port: '.grey + appPort.toString().cyan);
});
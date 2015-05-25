_Tracekit.init({
	domain: "https://tracekit.io",
	key: "key",
	user: "Testuser",
	version: "0.0.1",
	autoCapture: true
});

var err;

var DemoApplication = function () {
	this.exec = function () {
		this.run();
	};
	
	this.run = function () {
		this.log('#Run');
	};
	
	this.log = function () {
		console.log.apply(console, arguments);
		err = new Error('@DemoApplication');
		throw err;
	};

};

var demoApp = new DemoApplication();
demoApp.exec();

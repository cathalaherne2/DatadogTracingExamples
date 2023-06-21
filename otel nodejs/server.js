const request = require('request');
var sleep = require('system-sleep');

while (true){
	function2();
	sleep(1*1000);
}

function function2() {
	request('http://www.google.com', function (error, response, body) {
 	 console.error('error:', error); // Print the error if one occurred
 	 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 	 console.log('body:', body); // Print the HTML for the Google homepage.
 	 
	});
};

/*var exec= require("child_process").exec;
var querystring=require("querystring");
function start(response,postData){

	console.log("request handler 'start' was called");

	var body= '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="10" cols="30"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	

	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(body);
	response.end();
	
}

function upload(response, postData){

	console.log("request handler 'upload' was called");
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("you have sent : " + querystring.parse(postData).text);
	response.end();
}

exports.start=start;
exports.upload=upload;*/


/* the above code was for text and the following code is to upload the image */

var querystring=require("querystring"),
	fs=require("fs"),
	formidable=require("formidable");


function start(response){

	console.log("Request handler 'start' was called.");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" method="post">'+
		/*'<textarea name="text" rows="20" cols="60"></textarea>'+*/
		'<input type="file" name="upload" multiple="multiple">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();

}


function upload(response, request) {
		console.log("Request handler 'upload' was called.");
		var form = new formidable.IncomingForm();
		console.log("about to parse");
		form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		/* Possible error on Windows systems:
		tried to rename to an already existing file */
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
		if (err) {
		fs.unlink("/tmp/test.png");
		fs.rename(files.upload.path, "/tmp/test.png");
		}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
		});
}




function show(response) {
console.log("Request handler 'show' was called.");
fs.readFile("/tmp/test.png", "binary", function(error, file) {
if(error) {
response.writeHead(500, {"Content-Type": "text/plain"});
response.write(error + "\n");
response.end();
} else {
response.writeHead(200, {"Content-Type": "image/png"});
response.write(file, "binary");
response.end();
}
});
}
exports.start = start;





exports.start = start;
exports.upload = upload;
exports.show = show;

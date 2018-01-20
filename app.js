var express = require('express');
var app = express();
var request=require('request');
var bodyParser = require('body-parser');   
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/map', function (req, res) {  
	res.sendFile( __dirname + "/" + "map.html" );  
})

app.post('/api', urlencodedParser,function(req,res){  
    var from = JSON.stringify(req.body.src)
    var to = JSON.stringify(req.body.dest)
   url='https://maps.googleapis.com/maps/api/directions/json?origin=' + from + '&destination=' + to + '&key=AIzaSyCxwiwJPS81kxWqRMNFkqU-mgrTj3LAaXE';
request(url, function (error,response,body) {
	var x = JSON.parse(body);
	var r=x.routes;
var dur=r[0].legs[0].duration.text;
var sum=r[0].summary;
var step=r[0].legs[0].steps;
var s;
for (x in step) {
	s += step[x];
}

//console.log(dur);console.log(sum);console.log(step);
var y= "Route: " + sum + " , Duration: " + dur ;
console.log(step);
res.send(y);
}) 
});

app.listen(3000, () => console.log('Server started on port 3000'));
var express = require('express');

var app = express();
app.get("/",function(req,res){
res.send('Hello From Express Http Server');
});

app.get("/greetings",function(req,res){
res.send('Good Day');
});

app.get("/greet",function(request,response){
response.send('Good Day: ' 
+ (request.query.name || "unknown")
+ " " + request.query.lastname);
});

app.listen(3001,function(){
console.log('Http server listening at port 3001');
});
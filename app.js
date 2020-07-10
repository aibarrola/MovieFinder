var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render("search");
})


 app.get("/results", function(req,res){
     var query = req.query.search;

     var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
     request(url, function(error,response,body){
       
         if(!error && response.statusCode == 200){
             var data = JSON.parse(body);
             if(typeof data.Search == 'undefined'){
                res.redirect("error")
            }
             res.render("results",{data: data});
         }
     });
 });

 app.get("/error", function(req,res){
     res.render("error");
 })



app.listen(3000,function(){
    console.log('Server listening on port 3000');
});

var fs=require('fs');
var express=require('express');
var router=express.Router();
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var app=express();
var unique = require('array-unique');
var jsonparser=bodyParser.json();
var client = new Twitter({
    consumer_key: 'MKoTstgPHqdt9qf3k4WKxvHHL',
    consumer_secret: 'WirPZgrhmEU3kKRdZM54K9pUwuRSwfoaSKoZx4UIxBkcga2VgL',
    access_token_key: '1232631596139700224-ZA9MpS2gRr9pUYnWo1T43DvrftIRw5',
    access_token_secret: 'yPXotbMu4KrcmuTI15L4oLrzZGka7IRw209UbeGmUYN4w'
  });
var i;
var params={q:'#CAA',count:'10',lang:'en',result_type:'recent',tweet_mode:'extended'};
client.get('search/tweets',params,function(err,tweets,res){
    for(i=0;i<tweets.statuses.length;)
        try{
        console.log(i,tweets.statuses[i].full_text);
        i++;
        }
        catch(e){}
        // try{
        // console.log(tweets.statuses);
        // i++;
        // }
        // catch(e1){}
});
app.listen(3000);
console.log("The server is running at http://localhost:3000/");

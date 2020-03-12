var fs=require('fs');
var express=require('express');
var router=express.Router();
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var cors = require('cors');
var app=express();
var jsonparser=bodyParser.json();
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
app.use(cors());
app.use(bodyParser.json());
app.post('/',jsonparser,function(req,res){
    var client = new Twitter({
        consumer_key: 'MKoTstgPHqdt9qf3k4WKxvHHL',
        consumer_secret: 'WirPZgrhmEU3kKRdZM54K9pUwuRSwfoaSKoZx4UIxBkcga2VgL',
        access_token_key: '1232631596139700224-ZA9MpS2gRr9pUYnWo1T43DvrftIRw5',
        access_token_secret: 'yPXotbMu4KrcmuTI15L4oLrzZGka7IRw209UbeGmUYN4w'
      });

var params = {q:req.body.keyword,count:req.body.count,result_type:'recent',lang:'en'};
client.get('search/tweets', params, function(error, tweets, response)  
{
    if (!error) 
    {
        var i=0;
        var p=0,n=0,ne=0,r;
        var olddata = fs.readFileSync('tweets.json');
        var content = JSON.parse(olddata);
        if(!content[params.q])
        {
            for(i=0;i<params.count;)
            {
                if(i==0)
                {
                try{
                content[params.q]=[{
                    rtweet:tweets.statuses[i].retweet_count,
                    text:tweets.statuses[i].text,
                    fcount:tweets.statuses[i].favorite_count
                }];
                i++;}
                catch(e){}
            }
            else{
                try{
                content[params.q].push({
                    rtweet:tweets.statuses[i].retweet_count,
                    text:tweets.statuses[i].text,
                    fcount:tweets.statuses[i].favorite_count
                });
                
                i++;}
                catch(e){}
                }
            }      
    }
    else
    {
        for(i=0;i<params.count;){
            try{
            content[params.q].push({
                rtweet:tweets.statuses[i].retweet_count,
                    text:tweets.statuses[i].text,
                    fcount:tweets.statuses[i].favorite_count
            });
            i++;}
            catch(e){}
        }
    }
    var len=content[params.q].length;
    var rtweet1=0,rtweet2=0,rtweet3=0;
    var fcount1=0,fcount2=0,fcount3=0,fcount4=0;
    var i=0;
        for(i=0;i<len;i++)
        {
            
            if(Number(content[params.q][i].rtweet)<100)
            {
                rtweet1++;
            }
            else if(Number(content[params.q][i].rtweet)>100 &&
            Number(content[params.q][i].rtweet)<500)
            {
                rtweet2++;
            }
            else
            {
                rtweet3++;
                
            }
            if(Number(content[params.q][i].fcount)<10)
            {
                fcount1=fcount1+Number(content[params.q][i].fcount);
            }
            else if(Number(content[params.q][i].fcount)>10 &&
            Number(content[params.q][i].fcount)<30)
            {
                fcount2=fcount2+Number(content[params.q][i].fcount);
            }
            else if(Number(content[params.q][i].fcount)>30 &&
            Number(content[params.q][i].fcount)<50)
            {
                fcount4=fcount4+Number(content[params.q][i].fcount);
            }
            
            r=sentiment.analyze(content[params.q][i].text);
            if(r.score>0)
                    p++;
                else if(r.score<0)
                    n++;
                else   
                    ne++;
        }
        var info2=[{
        name: '100- range',
        data: [rtweet1]
        }
        ,{name:'500+ range',
        data:[rtweet3]},
        {name:'500- range',
       data:[rtweet2]
        }]
        var info=[{"name":"postive",y:p},{"name":"negetive",y:n},{"name":"neutral",y:ne}]
        var info3=[{
            name: 'fav tweets',
            data: [fcount1,fcount2,fcount3,fcount4]
        }]
        res.send({pie1:info,pie2:info2,pie3:info3});
}       
        fs.writeFile('tweets.json', JSON.stringify(content,null,2), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
            });
    });
});
app.listen(3000);
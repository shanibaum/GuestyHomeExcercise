var Twitter = require('twit');
var config = require('./config');

var Twit= new Twitter(config);
var d = new Date();

d.setHours(d.getHours() - 24);
Twit.get('search/tweets',{q:"airbnb since:"+d.toISOString(),count:100},reciveTweets);

function reciveTweets(err, data, response) {
     if(data){
         var csvWriter = require('csv-write-stream');
         var fs = require('fs');
         var statuses = data.statuses;
         var writer = csvWriter();
         writer.pipe(fs.createWriteStream('tweets.csv'));
         for(var index in data.statuses){
            writer.write({tweets: statuses[index].text});
         }
         writer.end();
    } else if(err){
         console.log('Error Occur');
     }
}
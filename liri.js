require("dotenv").config();
var keys = require("./keys")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs= require("fs");
var command =process.argv[2]
var searchTerm = process.argv.slice(3).join(" ");



switch(command){
    case "spotify-this-song":
        findSpotify()
        break;
}


function findSpotify(){
    spotify.search({type:"track", query:searchTerm}, function (error,data){

        writeLogs(JSON.stringify(data,null,2))
        console.log("Artist: ",data.tracks.items[0].album.artists[0].name)
        console.log("Song: ",data.tracks.items[0].name)
        console.log("Song Link: ",data.tracks.items[0].album.artists[0].external_urls.spotify)
        console.log("Album Name: ",data.tracks.items[0].album.name)
       
    
    })
}



function writeLogs(data){
    fs.writeFile("log.txt", data, function(err) {
   
      // If the code experiences any errors it will log the error to the console.
      if (err) {
        return console.log(err);
      }
    });
   }
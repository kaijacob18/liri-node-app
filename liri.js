require("dotenv").config();
var keys = require("./keys")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs= require("fs");
var axios = require("axios");
 
var command =process.argv[2]
var searchTerm = process.argv.slice(3).join(" ");
var moment = require("moment");

checkCommand();

function checkCommand(){
switch(command){
    case "spotify-this-song":
        findSpotify()
        break;
    case "concert-this":
        findBandInTown()
        break;
    case "movie-this":
        findMovie()
        break;
    case "do-what-it-says":
        findDoWhatItSays()
        break;

    default:
        console.log("woof");   
}
}

function findBandInTown(){
  var queryURL="https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
  axios
  .get(queryURL)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log("Name of the venue: " ,response.data[0].venue.name);
    console.log("Venue location: " ,response.data[0].venue.city);
    console.log("Date of the Event: " ,moment(response.data[0].datetime).format("MM/DD/YYYY"));

  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}
function findDoWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error,data){
    var array = data.split(", ")

    command=array[0];
    searchTerm= array[1];
    checkCommand()    
    

  })
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

function findMovie(){
  var queryURL = "http://www.omdbapi.com/?t="+searchTerm+"&y=&plot=short&apikey=trilogy"
axios.get(queryURL).then(function(response){
console.log("Title of the movie: ", response.data.Title);
console.log("Year the movie came out: ", response.data.Released);
console.log("IMDB Rating of the movie: ", response.data.imdbRating);
console.log("Rotten Tomatoes Rating of the movie: ", response.data.Ratings[0].Value);
console.log("Country where the movie was produced: ", response.data.Country);
console.log("Language of the movie: ", response.data.Language);
console.log("Plot of the movie: ", response.data.Plot);
console.log("Actors in the movie: ", response.data.Actors);
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
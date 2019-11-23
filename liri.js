// everything required to run this app
require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const moment = require('moment');
const keys = require("./keys.js");
const inquirer = require("inquirer");
const Spotify = require("node-spotify-api");

// function to handle the program
function runProgram() {

inquirer
  .prompt([
    {
      type: "list",
      message: "What command would you like to use?",
      choices: [
        "concert-this",
        "spotify-this-song",
        "movie-this",
        "do-what-it-says"
      ],
      name: "command"
    }
  ])
  .then(function(data) {
    switch (data.command) {
      case "concert-this":
        getConcert();
        break;
      case "spotify-this-song":
        getSong();
        break;
      case "movie-this":
        getMovie();
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("this doesn't exist");
    }
  });
}

// this function will retrieve the concert information
function getConcert() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter an artist",
        name: "artist"
      }
    ])
    .then(function(data) {
      if (data.artist === "") data.artist = "Niall Horan";

      axios
        .get(
          "https://rest.bandsintown.com/artists/" +
            data.artist +
            "/events?app_id=codingbootcamp"
        )
        .then(function(data) {
          if (!data) {
            console.log("no data found");
          } else {
            let concerts = data.data;

            for (let i = 0; i < concerts.length; i++) {
              console.log("---------------------------------");
              console.log(`The concert venue: ${concerts[i].venue.name}`);
              console.log(`The concert location: ${concerts[i].venue.city}, ${concerts[i].venue.country}`
              );
              console.log(`The concert date/time: ${moment(concerts[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}`);
            }
          }
          
          restart()
        })
        .catch(function(error) {
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          console.log(error);
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          restart()
        });
    }); // end then bracket (prompt)
} // end function bracket

// this function will retrieve the song information
function getSong() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter a song title",
        name: "song"
      }
    ])
    .then(function(data) {
      let song = data.song;

      if (song === "") song = "Lose You To Love Me";

      const spotify = new Spotify(keys.spotify);

      spotify
        .search({ type: "track", query: song, limit: 10 })

        .then(function(data) {
          let song = data.tracks.items;

          for (let i = 0; i < song.length; i++) {
            let theSong = song[i];

            console.log("                          ");
            console.log(`Artist(s): ${theSong.artists[0].name}`);
            console.log(`Track: ${theSong.name}`);
            console.log(`Album: ${theSong.album.name}`);
            console.log(`Preview Link: ${theSong.preview_url}`);
          }
          restart()
        })
        .catch(function(error) {
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          console.log(error);
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          restart()
        });
    });
}

// this function will retrieve the movie information
function getMovie() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter a movie",
        name: "movie"
      }
    ])
    .then(function(data) {
      if (data.movie === "") data.movie = "A Christmas Story";

      axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + data.movie)
        .then(function(data) {
          let movie = data.data;

          console.log(`Movie: ${movie.Title}`);
          console.log(`Year: ${movie.Year}`);
          console.log(`Rating: ${movie.Ratings[0].Value}`);
          console.log(`Rotten Tomato Rating: ${movie.Ratings[1].Value}`);
          console.log(`Produced in: ${movie.Country}`);
          console.log(`Language(s): ${movie.Language}`);
          console.log(`Movie Plot: ${movie.Plot}`);
          console.log(`Movie Actors: ${movie.Actors}`);
          restart()
        })
        .catch(function(error) {
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          console.log(error);
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          restart()
        });
    }); // end then (prompt)
} // function end brackets

// this function will retrieve the information from the "random.txt" file
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log("Oops ... there is an error.");
    } else {
      data = data.split(", ");

      switch (data[0]) {
        case "concert-this":
          getConcert();
          break;
        case "spotify-this-song":
          getSong();
          break;
        case "movie-this":
          getMovie();
          break;
        case "do-what-it-says":
          console.log(
            "Are you crazy? You are about to start and infinite loop!"
          );
          break;
        default:
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          console.log("this doesn't exist");
          console.log("!!!!!!!!!!!!!!!!!!!!!");
      restart()
      }
    }
  });
}

function restart() {  
console.log("*************************************")  
inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to do another search?",
        name: "confirm",
        default: true
      }
    ])
    .then(function(response) {
      if (response.confirm) {
        runProgram()
      }
    })
}

runProgram()

# liri-node-app

<h2>Project Name</h2>

LIRI

<h2>Concept</h2>

LIRI is a node.js application that uses user input to pull information about concerts, songs, movies and a wild-card file.

<h2>Project Overview</h2>

Created in node.js, LIRI is an application that uses several NPM packages to collect information on various inquirers, including concerts, songs and movies, as well as a wild-card file with pre-loaded commands. LIRI incorporates NPM packages such as inquirer, axios, node-spotify-api and moment. 

<h2>Process</h2>

To make LIRI more user-friendly, i incorporated inquirer to give the client a list of options that LIRI can help with.

 Pre-loaded commands:
 - "concert-this" — pulls information using axios
 - "spotify-this-song" - pulls information from spotify (requires an API token)
 - "movie-this" - pulls information using axios
 - "do-what-it-says" - pulls from a pre-loaded txt file

 Once the user makes their selection, it triggers the respective function and asks for a search parameter. If one is not provided, one is hard coded into the application. 

 To make the concert information more readable, I used NPM package moment to help formate the date and time. 

I also created a restart function that will ask the user if they would like to conduct another search. If yes, it will bring them back to the runProgram function and ask for a command. If not, it will execute the program, which will need to be called again using "node liri.js"

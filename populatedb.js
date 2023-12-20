#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Album = require("./models/album");
const Artist = require("./models/artist");
const Genre = require("./models/genre");

const albums = [];
const artists = [];
const genres = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createArtists();
  await createAlbums();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function artistCreate(index,name) {
  const artistdetail = { name: name}
  const artist = new Artist(artistdetail);

  await artist.save();
  artists[index] = artist;
  console.log(`Added author: ${name}`);
}

async function albumCreate(index, title, summary, artist, genre) {
  const albumdetail = {
    title: title,
    summary: summary,
    artist:artist
  };
  if (genre != false) albumdetail.genre = genre;

  const album = new Album(albumdetail);
  await album.save();
  albums[index] = album;
  console.log(`Added album: ${title}`);
}
async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Hip-hop"),
    genreCreate(1, "RnB"),
  ]);
}

async function createArtists() {
  console.log("Adding authors");
  await Promise.all([
    artistCreate(0, "Kendrick Lamar"),
    artistCreate(1, "Kanye West"),
    artistCreate(2, "Freddie Gibbs"),
    artistCreate(3, "Tory Lanez"),
  ]);
}

async function createAlbums() {
  console.log("Adding Albums");
  await Promise.all([
    albumCreate(0,
      "To pimp a butterfly",
      "Summary 1",
      authors[0],
      [genres[0]]
    ),
    albumCreate(1,
      "My beautiful dart twisted fantasy",
      "Summary 2",
      authors[1],
      [genres[0]]
    ),
    albumCreate(2,
      "Alone at prom",
      "Summary 3",
      authors[3],
      [genres[1]]
    ),
    
  ]);
}


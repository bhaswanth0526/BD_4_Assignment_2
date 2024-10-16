const express = require('express');
const { resolve } = require('path');

let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");


const app = express();
const port = 3010;

app.use(express.static('static'));

let db;
(async () => {

  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });
})();



async function fetchAllGames(){
  let query = "SELECT * FROM games";
  let response = db.all(query, []);
  return response;
}

app.get("/games", async (req, res)=>{
  try{
    let results = await fetchAllGames();
    if(results.length == 0)
      return res.status(404).json({message: "Games Not Found"});
    res.status(200).json({games: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchGameById(id){
  let query = "SELECT * FROM games WHERE id=?";
  let response = db.all(query, [id]);
  return response;
}

app.get("/games/details/:id", async (req, res)=>{
  try{
    let results = await fetchGameById(req.params.id);
    if(results.length == 0)
      return res.status(404).json({message: "Games Not Found"});
    res.status(200).json({games: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchGameByGenre(genre){
  let query = "SELECT * FROM games WHERE genre=?";
  let response = db.all(query, [genre]);
  return response;
}

app.get("/games/genre/:genre", async (req, res)=>{
  try{
    let results = await fetchGameByGenre(req.params.genre);
    if(results.length == 0)
      return res.status(404).json({message: "Games Not Found"});
    res.status(200).json({games: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchGamesByPlatform(platform){
  let query = "SELECT * FROM games WHERE platform=?";
  let response = db.all(query, [platform]);
  return response;
}

app.get("/games/platform/:platform", async (req, res)=>{
  try{
    let results = await fetchGamesByPlatform(req.params.platform);
    if(results.length == 0)
      return res.status(404).json({message: "Games Not Found"});
    res.status(200).json({games: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchGamesByRating(){
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = db.all(query, []);
  return response;
}

app.get("/games/sort-by-rating", async (req, res)=>{
  try{
    let results = await fetchGamesByRating();
    if(results.length == 0)
      return res.status(404).json({message: "Games Not Found"});
    res.status(200).json({games: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchAllPlayers(){
  let query = "SELECT * FROM players";
  let response = db.all(query, []);
  return response;
}

app.get("/players", async (req, res)=>{
  try{
    let results = await fetchAllPlayers();
    if(results.length == 0)
      return res.status(404).json({message: "Players Not Found"});
    res.status(200).json({players: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchPlayerByID(id){
  let query = "SELECT * FROM players WHERE id=?";
  let response = db.all(query, [id]);
  return response;
}

app.get("/players/details/:id", async (req, res)=>{
  try{
    let results = await fetchPlayerByID(req.params.id);
    if(results.length == 0)
      return res.status(404).json({message: "Players Not Found"});
    res.status(200).json({players: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchPlayersByPlatform(platform){
  let query = "SELECT * FROM players WHERE platform=?";
  let response = db.all(query, [platform]);
  return response;
}

app.get("/players/platform/:platform", async (req, res)=>{
  try{
    let results = await fetchPlayersByPlatform(req.params.platform);
    if(results.length == 0)
      return res.status(404).json({message: "Players Not Found"});
    res.status(200).json({players: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchPlayersByRating(){
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let response = db.all(query, []);
  return response;
}

app.get("/players/sort-by-rating", async (req, res)=>{
  try{
    let results = await fetchPlayersByRating();
    if(results.length == 0)
      return res.status(404).json({message: "Players Not Found"});
    res.status(200).json({players: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchAlltournaments(){
  let query = "SELECT * FROM tournaments";
  let response = db.all(query, []);
  return response;
}

app.get("/tournaments", async (req, res)=>{
  try{
    let results = await fetchAlltournaments();
    if(results.length == 0)
      return res.status(404).json({message: "Tournaments Not Found"});
    res.status(200).json({tournaments: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchtournamentById(id){
  let query = "SELECT * FROM tournaments WHERE id=?";
  let response = db.all(query, [id]);
  return response;
}

app.get("/tournaments/details/:id", async (req, res)=>{
  try{
    let results = await fetchtournamentById(req.params.id);
    if(results.length == 0)
      return res.status(404).json({message: "Tournaments Not Found"});
    res.status(200).json({tournaments: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchtournamentByGameId(id){
  let query = "SELECT * FROM tournaments WHERE gameId=?";
  let response = db.all(query, [id]);
  return response;
}

app.get("/tournaments/game/:id", async (req, res)=>{
  try{
    let results = await fetchtournamentByGameId(req.params.id);
    if(results.length == 0)
      return res.status(404).json({message: "Tournaments Not Found"});
    res.status(200).json({tournaments: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});



async function fetchtournamentByPrizePool(){
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = db.all(query, []);
  return response;
}

app.get("/tournaments/sort-by-prize-pool", async (req, res)=>{
  try{
    let results = await fetchtournamentByPrizePool();
    if(results.length == 0)
      return res.status(404).json({message: "Tournaments Not Found"});
    res.status(200).json({tournaments: results});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

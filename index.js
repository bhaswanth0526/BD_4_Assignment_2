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



app.get("/games", async (req, res)=>{
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

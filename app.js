require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const db = require("./database");

app.use(express.urlencoded({extended:false}));

db.execute('SELECT * FROM world.city LIMIT 5').then((data)=>{
    console.log(data[0]);
})

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
   res.render("home");
})

app.listen(3000);

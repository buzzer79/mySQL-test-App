require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const db = require("./database");

app.use(express.urlencoded({extended:false}));

const dbData = async()=>{
    const data = await db.execute('SELECT * FROM world.city LIMIT 5');

    return await data;
}


app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    const data = await dbData(); 
    console.log(data[0]);
   res.render("home",{data:data[0]});
})

app.listen(3000);

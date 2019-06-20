require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const db = require("./database");

app.use(express.urlencoded({
    extended: false
}));

let cnt = 0;
let page = 0;
let file = "";
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async (req, res) => {

    const sqlQuery =
        `SELECT film_id,title,release_year,rating,length
         FROM sakila.film 
         LIMIT 20`;

    const dbData = async () => {
        const data = await db.execute(sqlQuery);
        return await data;
    }

    const data = await dbData();

    res.render("home", {
        data: data[0],
        cnt
    });
});

app.get("/next/:nr", async (req, res) => {
    page += 1;
    cnt += 20;
    
 
    const sqlQuery =
    `SELECT film_id,title,release_year,rating,length
     FROM sakila.film 
     WHERE film_id BETWEEN ${cnt} AND ${cnt+20}`;
     console.log(sqlQuery);

    const dbData = async () => {

        const data = await db.execute(sqlQuery);
        return await data;
    }

     file = await dbData();

    res.render("home",{data:file[0],page});
})

app.get("/back/:nr",async(req,res)=>{
    page -= 1;
    cnt -= 20;

    const sqlQuery =
    `SELECT film_id,title,release_year,rating,length
     FROM sakila.film 
     WHERE film_id BETWEEN ${cnt} AND ${cnt+20}`;
     console.log(sqlQuery);

    const dbData = async () => {

        const data = await db.execute(sqlQuery);
        return await data;
    }

     file = await dbData();

    res.render("home",{data:file[0],page});
});




app.listen(3000);
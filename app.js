require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const db = require("./database");

app.use(express.urlencoded({extended:false}));

let cnt = 0;
app.set("view engine","ejs");
app.use(express.static("public"));




app.get("/",async(req,res)=>{

    const dbData = async()=>{
        const data = await db.execute('SELECT * FROM sakila.film LIMIT 10');
        return await data;
    }
    
    const data = await dbData(); 
   
   res.render("home",{data:data[0]});
});

app.get("/next",async(req,res)=>{
    // const add = req.params.add;
    // console.log(add);
    cnt +=10;
    console.log(cnt);
    let sqlQuery = `SELECT * FROM sakila.film LIMIT ${cnt} OFFSET 10`
    

    const dbData = async()=>{
        
        const data = await db.execute(sqlQuery);
        return await data;
        
    }
    
    const data = await dbData(); 
    console.log(data[0][1]);
  

    res.render("home",{data:data[0]});
})


app.listen(3000);

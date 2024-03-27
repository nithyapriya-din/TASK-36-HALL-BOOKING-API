// const express = require ('express') // vanilla JS 
import express from "express"
const app = express()
app.use(express.json())
import AppRouter from "./routes/router.js"
import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.PORT) || 3000



app.use('/', AppRouter)


app.get('/',(req,res)=>{
    res.send("Welcome to the Hall Booking system!")
})

app.get('/test', (req, res) => {
    res.send('This is a test route.');
  });


app.listen(PORT, ()=>{
    console.log(`App listening at ${PORT}`)
})
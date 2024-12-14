const express=require("express")
const cors=require('cors')

require("dotenv").config()

require("./db/connection")
const studentRoutes =require("./routes/studentRoutes")

var app=express()
app.use(express.json());
app.use(cors())
app.use('/student',studentRoutes)

app.listen(process.env.port,()=>{
    console.log(`listening to port ${process.env.port}`)
})
import express from  'express'
import { createServer } from "http"
import { Server } from "socket.io";
import { connectToSocket } from './controllers/socketManager.js';

import mongoose from 'mongoose'
import cors from  'cors'
import userRoutes from "./routes/users.route.js"

const app = express();
const server  = createServer(app)
const io = connectToSocket(server)

app.set("port",(8000))
app.use(cors())
app.use(express.json({limit : "40Kb"}))
app.use(express.urlencoded({limit: "40Kb", extended: true}))


app.use("/api/v1/users", userRoutes)
// app.use("/api/v2/users", newUserRoutes)
// app.get('/home', (req, res) => {
//   res.send('Hello World!')
// })

const start =  async () =>{

    app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://bhatttarun959_db_user:bhatt%40123@cluster0.hvfhyj4.mongodb.net/")
    console.log(`Database is hosting on : ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`)
})
}
start()

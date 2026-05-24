import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

import fs from "fs";
const logMsg = (msg) => {
    fs.appendFileSync("server.log", `${new Date().toISOString()} - ${msg}\n`);
    console.log(msg);
};

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    logMsg("Connecting to MongoDB...")
    try {
        const connectionDb = await mongoose.connect(process.env.MONGO_URI)
        logMsg(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
        server.listen(app.get("port"), () => {
            logMsg(`LISTENIN ON PORT ${app.get("port")}`)
        });
    } catch (error) {
        logMsg(`ERROR CONNECTING TO MONGO: ${error.message}`)
    }



}



start();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const crypto = require("crypto");
const fs = require("fs");
const mongoose = require('mongoose')
const { names, cities } = require("./src/data.json");


// dotenv for reading enviorment variables
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  const dataStream = fs.createReadStream("./public/index.html");
  dataStream.pipe(res);
  
});


//established mongo db connection

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
  console.log("Connected to the database");
})
.catch((err) => {
  console.log("Error in connection", err);
});


//encrypted secret key

function encryptKey(name, origin, destination) {
    try {
        const sha256Hasher = crypto.createHash("sha256", process.env.CRYPTO_SECRET);
        const secret_key = sha256Hasher
        .update(name + origin + destination)
        .digest('hex');
        
        return secret_key.substring(0,32);
    } catch (error) {
        console.log(error)
    }
  };


  //payload encrypted function
function encryptedData(secret, text){
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return iv.toString('hex') + encrypted;
    } catch (error) {
        console.log(error)
    }

  };

  //payload encrypted function

function decryptData(secret, text){
    try {
        const iv = Buffer.from(text.slice(0, 32), 'hex');
        const encrypted = text.slice(32);

        const decipher = crypto.createDecipheriv('aes-256-ctr', secret, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.log(error)
    }
  }


//creating new socket server
const io = new Server(server);

io.on("connection", (socket) => {

  socket.on("first", (message) => {

        setInterval(() => {
            const random = Math.floor(Math.random() * names.length);
            const name = names[random];
            const origin = cities[random];
            const destination = cities[cities.length - 1 - random];
            const encryptedKey = encryptKey(name, origin, destination);
            const encryptedMessage = {
                name: encryptedData(encryptedKey, name),
                origin: encryptedData(encryptedKey, origin),
                destination: encryptedData(encryptedKey, destination),
                secret_key: encryptedKey
            };
            io.emit("mess", encryptedMessage);
        }, 9900);
    });


  socket.on("dataToBeEncrypted", (data)=> {
    
    const split = data.split('|')
    const dataToBeEncrypted = {
        name:decryptData(split[3], split[0]),
        origin:decryptData(split[3], split[1]),
        destination:decryptData(split[3], split[2]),
        secret_key:split[3]
    }
    io.emit('mess2', dataToBeEncrypted)
  })
});

server.listen(PORT, () => {
  console.log("server is listening on", PORT);
});

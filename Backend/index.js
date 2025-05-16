const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const authRoute = require("./Routes/authRoutes");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Socket Connection Successfull with : ", socket.id);

    socket.on("Send message", (data) => {
        io.emit("Recevie message : ", data)
    })

    socket.on("disconnect", () => {
        console.log("Socket Disconnect Successfull with : ", socket.id);

    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chat app backend running!");
});

app.use("/api/auth", authRoute);


main().then((res) => {
    console.log("Database connection successfully!");
}).catch((err) => {
    console.log("Database connection failed!", err);
})

async function main() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
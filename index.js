const express = require("express");
const app = express();
const connectDB = require("./db");
const cookieParser = require("cookie-parser");

const PORT = 3000;

const users = require("./routes/users");
const login = require("./routes/login");
const signup = require("./routes/signup");
const logout = require("./routes/logout");
const verify = require("./routes/verify");
const cors = require("cors");

const { Server } = require("socket.io");
const http = require("http");

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://mern-frontend-eight-bay.vercel.app",
    credentials: true,
  })
);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    // origin: "*",
    // origin: "http://localhost:5173",
    origin: "https://mern-frontend-eight-bay.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  socket.on("UserMessage", (message) => {
    console.log(`message success`);
    io.emit("UserMessage", message);
  });
});

connectDB();

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", users);
app.use("/api", login);
app.use("/api", signup);
app.use("/api", logout);
app.use("/api", verify);

app.get("/", (req, res) => {
  console.log("I am inside home page router");
  res.send("Welcome");
});

httpServer.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const connectDB = require("./db");

// const users = require("./routes/users");
// const login = require("./routes/login");
// const signup = require("./routes/signup");

// const { Server } = require("socket.io");
// const http = require("http");
// const PORT = 3000;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// connectDB();

// app.use("/api", users);
// app.use("/api", login);
// app.use("/api", signup);

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// // Socket.IO
// const httpServer = http.createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// io.on("connect", (socket) => {
//   socket.on("UserMessage", (message) => {
//     io.emit("UserMessage", message);
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`Server Started at PORT:${PORT}`);
// });

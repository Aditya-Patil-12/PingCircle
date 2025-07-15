require('dotenv').config()
// Library & Middleware Imports ====================
const express = require('express');
const { Server } = require('socket.io');
const {createServer} = require('http');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {errorHandlerMiddleware,notFoundMiddleware} = require('./middleware');
// =====================================
// config Folder Imports ======
const {connectDB} = require('./.config');
// ============================

// Router Imports =============
const baseRoute = "/api/v1";
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const { log } = require('console');
// ============================

const app = express();

// Middleware =================
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true,
// }))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(express.json());
console.log(app.request.body, "::::  ", app.request.baseUrl);
app.use(cookieParser(process.env.COOKIE_SECRET))
// ============================

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})

// Routers Added =========
app.use((baseRoute+'/auth'),authRouter);
app.use(baseRoute + "/users", userRouter);
app.use(baseRoute + "/chats", chatRouter);
app.use(baseRoute + "/messages", messageRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// ===========================
// app.get('/*',()=>{
//     res.send('Hey');
// })

const PORT= process.env.PORT || 5000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
//   pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});
console.log("Are we here ")
io.on("connection",(socket)=>{
    // console.log("New User Connected",socket.id);
    socket.on("joinPersonalChat",(userData)=>{
        console.log("This data for setup", userData);
        socket.join(userData._id);
        socket.emit("connected", { data: "Het" });
    })
    socket.on("joinChat",()=>{
        console.log("This undefined", userData);
        socket.join(userData._id);
        socket.emit("connected",{ data:"This the join Chat ON" });
    })
    socket.on("newMessage",(newMessageReceived)=>{
        console.log("Received Message", newMessageReceived);
        socket.emit("connected", { data: "This the newMessage Chat" });
    })
    socket.on("receiveNotification",(notification)=>{

    })
})


const startServer = async ()=>{
    try {
          await connectDB();
          httpServer.listen(PORT, () => {
            console.log(`Server started Listening on PORT ${PORT}`);
          });     
    } catch (error) {
        console.log("There was a error ::: "," ",`${error.message}`);
    }
}
startServer();
require('dotenv').config()
// Library & Middleware Imports ====================
const express = require('express');
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
// ============================

const app = express();


// Middleware =================
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true,
// }))
app.use(cors())
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
// ============================

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})


// Routers Added =========
app.use((baseRoute+'/auth'),authRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// ===========================
// app.get('/*',()=>{
//     res.send('Hey');
// })

const PORT= process.env.PORT || 5000;
const startServer = async ()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server started Listening on PORT ${PORT}`)
        })
    } catch (error) {
        console.log("There was a error ::: "," ",`${error.message}`); 
    }
}
startServer();



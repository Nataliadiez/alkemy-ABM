
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './config/mysqlConector.js'
import express from 'express';
import { router as apiRouter } from './routes/apiRouter.js';
import cors from 'cors';
import morgan from 'morgan';


//mysql
dotenv.config();
connectDB();


const app = express();

app.use(express.json({ extender: true}))
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const PORT = process.env.PORT || 4000;
app.set("port", PORT);

// CORS
const corsOptions = {}
app.use(cors());


// Routes
app.get("/", (req, res) => {
    res.status(302).redirect("/api")
})

app.use('/api', apiRouter)

// handling of undefined routes
app.use((req, res) => {
    res.status(404).json({ msg: "Invalid route" })
})

app.listen(app.get("port"), () =>{
    console.log(`Server running on port ${app.get("port")}`)
})

export default app;


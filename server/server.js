import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();
const port=process.env.PORT || 4000;

//Allow multiple origins
const allowedOrigins =['http://localhost:5173']

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.use(express.json());

app.get('/', (req, res) => res.send("API is working"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
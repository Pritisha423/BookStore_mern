import express from "express";
import {PORT} from "./config.js";
import mongoose from "mongoose"; 
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';
const app = express(); 

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for handling CORS POlICY
// Option 1: Allow all Origines with Default of cors(*)
app.use(cors());
// Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
 
// Define a route handler for a GET request at the root URL ("/")
app.get('/', (request, response) => {
    // Log the incoming request details
    console.log(request);
    
    // Set the HTTP response status code to 234 (unconventional)
    // and send a "Welcome" message to the client
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Middleware for books router.
app.use('/books',booksRoutes);

mongoose.connect("mongodb://localhost:27017/BookStore")
        .then(() => {
            console.log('App connected to database');
            // The `app.listen()` function starts the server on the specified port and executes the callback once it's running
            app.listen(PORT, () => {
               // Inside the callback function: 
                // It includes the value of the `PORT` variable in the log message to inform you of the port number being used.
                console.log(`App is listening to port: ${PORT}`);
             }); 
        })
        .catch((error) =>{
            console.log(error);
        });



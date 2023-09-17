import express from "express";
import {PORT} from "./config.js";
import mongoose from "mongoose"; 

const app = express(); 

// Define a route handler for a GET request at the root URL ("/")
app.get('/', (request, response) => {
    // Log the incoming request details
    console.log(request);
    
    // Set the HTTP response status code to 234 (unconventional)
    // and send a "Welcome" message to the client
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

mongoose.connect("mongodb://localhost:27017/BookStore")
        .then(() => {
            console.log('App connected to database');
            // The `app.listen()` function starts the server and binds it to a port for incoming HTTP requests.
            // The second argument to `app.listen()` is a callback function that gets executed once the server is running and listening for incoming requests.
            app.listen(PORT, () => {
               // Inside the callback function: 
                // It includes the value of the `PORT` variable in the log message to inform you of the port number being used.
                console.log(`App is listening to port: ${PORT}`);
            }); 
        })
        .catch((error) =>{
            console.log(error);
        })



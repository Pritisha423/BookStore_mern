import express, { response } from "express";
import {PORT} from "./config.js";
import mongoose from "mongoose"; 
import { Book } from "./models/bookModel.js";
const app = express(); 

// Define a route handler for a GET request at the root URL ("/")
app.get('/', (request, response) => {
    // Log the incoming request details
    console.log(request);
    
    // Set the HTTP response status code to 234 (unconventional)
    // and send a "Welcome" message to the client
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route handler for creating new book entries via a POST request
app.post('/books', async (request, response) => {
    try {
        // Validate incoming request body fields
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        // Create a new book entry in the database
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        // Send the created book as a response with a status code
        return response.status(201).send(book);
    } catch (error) {
        // Handle errors and send an error response
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route for the Get All Books from database
app.get('/books', async (request,response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for the Get All Books from database by id
app.get('/books/:id', async (request,response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json({book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

app.put('/books/:id', async (request,response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all requiered fields: title, author, publishYear'
            })
        }
        const {id} = request.params; 
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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
        })



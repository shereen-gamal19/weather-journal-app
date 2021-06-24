
// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();
/* dependencies*/
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website1'));
//we will use the port=3000 so we will write it with the localhost in the browser localhost:3000
const port = 3000;
//we will set a variable called server1 and pass a listen method that will take 2 arguments the first is our port and the second is callback function called listening1
const server1 = app.listen(port,listening1);// the function will console
function listening1(){
     console.log("server running");
     // console our port 
     console.log(` running on localhost: ${port} `);
}
// we will make HTTP routes get and post
//here we will make a get requests from the client side to the server to handle the HTTP GET request which will get the data from the API about the weather so we will make a route which its calles get
// our path  "/url" and we will make our callback function
app.get('/url',function(request,response){// the two arguments of the function are request,response
    //we will make the response is to send the object projectData by using .send
        response.send(projectData);
});
// we will make a POST request to handle HTTP POST requests and to send the data that we will store them in the object " pojectData"
// making a POST to the endpoint which is projectData object so that we store all data in the object projectData and it will be accessed through the GET requests
// the path will be "/add" and callback function will take the all data received from req.body
app.post('/add',(req , res) =>{
    // we append the temperature from the body to the projectData object by using req.body
    projectData.temp=req.body.temp;
// we append the date from the body to the projectData object by using req.body
    projectData.date=req.body.date;
// we append the content from the body to the projectData object by using req.body
    projectData.content=req.body.content;
// then our response is to send projectData object by using .send
    res.send(projectData);
    //we console our  projectData object
 console.log(projectData)
});
// in the terminal i install the packeages express ,cors , body-parser
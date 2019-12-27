const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//How does client and server work together? First of all, 
//client (front-end, mobile, other webs) sends a request sometimes attached 
//with body which has data in it to express app, body-parser is 
//basically gonna anaylize the data and hands it to the request handler, after being handled,
// if there is something wrong, catch error and move to the next middleware, then
//send a error respond back to client. 
//What is middleware? any functions fired between request and respond two points

//set the express app
const app = express();

//Connect to the MongoDB
mongoose.connect('mongodb://localhost/WenkaiTan');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//Initialize routes
app.use('/api', routes);

//Error handling
app.use(function(err, req, res, next){
    console.log(err);
    res.send({errors: err.message});
});

//Listen for requests
app.listen(process.env.port || 8080, ()=>{
    console.log('Now ready for the request');
});
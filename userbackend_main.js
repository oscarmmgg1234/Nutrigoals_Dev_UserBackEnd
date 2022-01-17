
const express = require('express');
const axios = require('axios');
const { listening_port} = require('./src/Constants/constants');
const {http_client} = require('./src/Serverhttp_client')
const foodsearch_cache = require('./src/node-cache/foodSearch-cache');
const foodget_cache = require('./src/node-cache/foodGet-cache');

const server = express();
server.use(express.json())

const API = new http_client();

server.listen(listening_port,null);

server.get('/foodSearch', foodsearch_cache(300), function(req,res){
        API.getFoodSearch(req.body.foodID, req.body.API_access_token,req.body.page_number, (response)=>{
                console.log("food search request with r.body: " + req.body);
                console.log("food searh server response body: " + response);
                res.send(response)
        })
      
});

server.get('/getFood', foodget_cache(300), function(req,res){
        API.getFoodWithID(req.body.foodID, req.body.API_access_token, (response)=>{
                res.send(response)
        })
    
})

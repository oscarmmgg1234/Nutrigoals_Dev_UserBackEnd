
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const { listening_port} = require('./src/Constants/constants');
const {http_client} = require('./src/Server/http_client')
const foodsearch_cache = require('./src/node-cache/foodSearch-cache');
const foodget_cache = require('./src/node-cache/foodGet-cache');

const server = express();
server.use(bodyParser.json())


const API = new http_client();

server.listen(listening_port,null);

server.post('/foodSearch', foodsearch_cache(300), function(req,res){
        API.getFoodSearch(req.body.foodID, req.body.API_access_token,req.body.page_number, (response)=>{
                
                res.send(response)
        })
      
});

server.post('/getFood', foodget_cache(300), function(req,res){
        API.getFoodWithID(req.body.foodID, req.body.API_access_token, (response)=>{
                res.send(response)
        })
    
})

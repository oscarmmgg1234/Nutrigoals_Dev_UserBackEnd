
const express = require('express');
const axios = require('axios');
const { listening_port} = require('./src/utils');
const {http_client} = require('./src/http_client')
const foodsearch_cache = require('./src/foodSearch-cache');
const foodget_cache = require('./src/foodGet-cache');

const server = express();
server.use(express.json())

const API = new http_client();

server.listen(listening_port,null);

server.get('/foodSearch', foodsearch_cache(300), function(req,res){
        API.getFoodSearch(req.body.foodID, req.body.API_access_token,req.body.page_number, (response)=>{
                res.send(response)
        })
      
});

server.get('/getFood', foodget_cache(300), function(req,res){
        API.getFoodWithID(req.body.foodID, req.body.API_access_token, (response)=>{
                res.send(response)
        })
    
})

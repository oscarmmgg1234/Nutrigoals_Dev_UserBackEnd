
const express = require('express');
const axios = require('axios');
const { listening_port} = require('./src/utils');
const {http_client} = require('./src/http_client')
const cache = require('./src/server-cache')

const server = express();
server.use(express.json())

const API = new http_client();

server.listen(listening_port,null);

server.get('/foodSearch',cache(900),function(req,res){
        API.getFoodSearch(req.body.foodID, req.body.API_access_token,(response)=>{
                res.send(response)
        })
      
});

server.get('/getFood', cache(900), function(req,res){
        API.getFoodWithID(req.body.foodID, req.body.API_access_token, (response)=>{
                res.send(response)
        })
    
})

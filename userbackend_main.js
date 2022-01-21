
const express = require('express');
const bodyParser = require('body-parser')
const { listening_port, status} = require('./src/Constants/constants');
const {Server} = require('./src/Server/http_client')
const foodsearch_cache = require('./src/node-cache/foodSearch-cache');
const foodget_cache = require('./src/node-cache/foodGet-cache');

const server = express();
server.use(bodyParser.json())


const API = new Server();

API.connect();
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

server.post('/getMacroData', (req, res)=>{
        API.get_macro_data(req.body, (result)=>{
                res.send(result)
        })
        
})

server.post('/createMacroData', (req,res)=>{
        API.create_user_macro_data_handler(req.body);
        res.send(status.succeded);
})

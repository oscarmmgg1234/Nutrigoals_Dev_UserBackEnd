
const express = require('express');
const axios = require('axios');
const { listening_port, api } = require('./constants');
const {cache} = require('./src/server-cache')

const app = express();

const API = new api();

app.listen(listening_port,null);

app.get('/foodSearch',function(req,res){

        var config = {
                  method: 'post',
                  url: API.foodSearch(req.header('food')),
                  headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + req.header('token'),
                  }}
        axios(config).then(function(response){res.send(JSON.stringify(response.data))})
});

app.get('/getFood', cache(900), function(req,res){

        var config = {
                method: 'post',
                url: API.foodGet(req.header('foodID')),
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + req.header('token'),
                }
        }
        axios(config).then(function(response){res.send(JSON.strigify(response.data))})
})

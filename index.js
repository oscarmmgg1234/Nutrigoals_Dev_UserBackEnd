const express = require('express');
const axios = require('axios');
const app = express();

const port = 5001;


async function getFoodSearch(food_expr, access_token){
        let data;
        console.log('sent request');
        await axios.post('https://platform.fatsecret.com/rest/server.api',{
                headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + access_token,
                },
                params: {
                        method: "foods.search",
                        search_expression: food_expr,
                        format: "json",
                },

        }).then(function(res){res=>res.json();data=res.data})
        return data;

}//end of getFoodSearch


app.listen(port,()=>console.log('listening on port ' + port ));

app.get('/foodSearch',function(req,res){



        let urls = "https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=" + req.header('food') + "&format=json";

        var config = {
                  method: 'post',
                  url: urls,
                  headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer ' + req.header('token'),

                  }}
        console.log(urls);
        axios(config).then(function(response){res.send(JSON.stringify(response.data))})
});

app.get('/getFood', function(req,res){

        let urls = 'https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=' + req.header('foodID') + '&format=json';

        var config = {

                method: 'post',
                url: urls,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + req.header('token'),
                }
        }
        axios(config).then(function(response){res.send(JSON.strigify(response.data))})
})
~                                                                                                                                                                                                                                             
~                                                                                                                                                                                                                                             
~                                                                                                                                                                                                                                             
~                                                                                                                                                                                                                                             
~                                                                                                                                                                                                                                             
~           

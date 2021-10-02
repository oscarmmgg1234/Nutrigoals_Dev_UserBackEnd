const express = require('express');
const axios = require('axios');
const app = express();

const port = 5001;
var isResponseArray = true;
var ConsoleData;

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

	   

	let urls = "https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=" + req.header('food') + "&format=json" + "&page_number=" + req.header('page_number');

	var config = {
		  method: 'post',
		  url: urls,
		  headers: { 
			      'Content-Type': 'application/json', 
			      'Authorization': 'Bearer ' + req.header('token'),

		  }}
	
	axios(config).then(function(response){res.send(JSON.stringify(response.data))})
});

app.get('/getFood', function(req,res){
	
	let portionIndex = req.header('serving_index');

        let urls = 'https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=' + req.header('foodId') + '&format=json';

        var config = {

                method: 'post',
                url: urls,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + req.header('token'),
                }
        }
       		 axios(config).then(function(response){
			
			 try {
				 const clientData = {food_name: response.data.food.food_name,
                		protein: response.data.food.servings.serving[portionIndex].protein,
                		fat: response.data.food.servings.serving[portionIndex].fat,
                		carbohydrates: response.data.food.servings.serving[portionIndex].carbohydrate,
				sugar: response.data.food.servings.serving[portionIndex].sugar,
                		sodium: response.data.food.servings.serving[portionIndex].sodium,
                		serving_description: response.data.food.servings.serving[portionIndex].serving_description, brand_name: response.data.food.brand_name,
       				 };
				res.send(JSON.stringify(clientData))
				isResponseArray = true;
	  			
			 }
			 catch(error){ 
				 const clientData = {food_name: response.data.food.food_name,
                                protein: response.data.food.servings.serving.protein,
                                fat: response.data.food.servings.serving.fat,
                                carbohydrates: response.data.food.servings.serving.carbohydrate,
				sugar: response.data.food.servings.serving.sugar,
                                sodium: response.data.food.servings.serving.sodium,
                                serving_description: response.data.food.servings.serving.serving_description,
					 brand_name: response.data.food.brand_name,
                                };
				res.send(JSON.stringify(clientData))
				isResponseArray = false;
				
			 }
			})})

app.get('/getFoodServingSize', function(req,res){

        let urls = 'https://platform.fatsecret.com/rest/server.api?method=food.get.v2&food_id=' + req.header('foodId') + '&format=json';

        var config = {

                method: 'post',
                url: urls,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + req.header('token'),
                }
        }
        axios(config).then(function(response){
		let refactor = null;
		if(isResponseArray){
                        refactor = 
				response.data.food.servings.serving.map(obj=>{ return {serving_description: obj.measurement_description}});
                }else {
                        refactor = response.data.food.servings.serving.measurement_description;
		}
		console.log(refactor);
		res.send(JSON.stringify({data: refactor}))})
})

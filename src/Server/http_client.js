
const axios = require('axios');
const DB = require('./my_sql_driver');
const {status} = require('../Constants/constants');
const { response } = require('express');

class Server extends DB{
  constructor() {
    super();
    this.api_baseURL = "https://platform.fatsecret.com/rest/server.api";
  }
  foodSearchCreateURL(food_expr, page_number) {
    return (
      this.api_baseURL +
      "?method=foods.search&search_expression=" +
      food_expr + "&page_number=" + page_number + 
      "&max_results=20" + "&format=json" 
    );
  }
  foodGetCreateURL(food_id) {
    return (
      this.api_baseURL +
      "?method=food.get.v2&food_id=" +
      food_id +
      "&format=json"
    );
  }
  getBaseURL() {
    return this.api_baseURL;
  }
  //foodSearch Function
  getFoodSearch(foodID,API_access_token, page_number, callback){
    var config = {
      method: 'post',
      url: this.foodSearchCreateURL(foodID, page_number),
      headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + API_access_token,
      }}
axios(config).then(function(response){return callback(response.data)})
  }

  getFoodWithID(foodID, API_access_token, callback){
    var config = {
      method: 'post',
      url: this.foodGetCreateURL(foodID),
      headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + API_access_token,
      }
}
axios(config).then(function(response){return callback(response.data)})
  }

get_macro_data(userOBJ, callback){
  this.get_user_macro_data_handler(userOBJ, (res)=>{
    if(res){
      let bfData = res.filter((obj)=>{if(obj.food_group === "BF"){return obj}});
      let lunchData = res.filter((obj)=>{if(obj.food_group === "LU"){return obj}});
      let dinnerData = res.filter((obj)=>{if(obj.food_group === "DI"){return obj}});
      let snackData = res.filter((obj)=>{if(obj.food_group === "SN"){return obj}});
      let responseData = {bf: bfData, lu: lunchData, di: dinnerData, sn: snackData};
      //sort and prepare data
      callback(responseData)
    }
    else{
      return callback(status.failed);
    }
  })
}

};


module.exports = {Server}
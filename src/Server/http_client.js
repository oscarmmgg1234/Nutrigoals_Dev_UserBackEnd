
const axios = require('axios');

class http_client{
  constructor() {
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
};


module.exports = {http_client}
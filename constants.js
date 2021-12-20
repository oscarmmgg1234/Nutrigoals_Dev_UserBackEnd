export const listening_port = 5001;

export class api{
    constructor(){
        this.api_baseURL = "https://platform.fatsecret.com/rest/server.api"
    }
    foodSearch(food_expr) {
        return this.api_baseURL + "?method=foods.search&search_expression=" + food_expr + "&format=json"; 
    }
    foodGet(food_id){
        return this.api_baseURL + "?method=food.get.v2&food_id=" + food_id + "&format=json";
    }
    getBaseURL(){
        return this.api_baseURL;
    }
}
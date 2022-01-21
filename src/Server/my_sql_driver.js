const mysql = require('mysql');
const { DATETIME } = require('mysql/lib/protocol/constants/types');

module.exports = class DB {
  constructor() {
    this.db = mysql.createConnection({
      user: "admin",
      host: "db.ca1tiucmqwpl.us-west-2.rds.amazonaws.com",
      port: "3306",
      password: "Omariscool1234",
      database: "nutrigoalsDB",
    });
  }

  connect() {
    this.db.connect((err) => {
      if (err !== null) throw err;
    });
  }

  get_user_macro_data_handler(userOBJ, callback) {
    let query = `SELECT * from user_food_log WHERE (user_id = '${userOBJ.userID}' AND date_category = '${userOBJ.date}')`;
    this.db.query(query, (err, result) => {
      if (err !== null) {
        console.log(err)
        return callback(false);
      } else {
        
        return callback(result);
      }
    });
  }

  create_user_macro_data_handler(userOBJ) {
    this.db.query(
      "INSERT INTO user_food_log(user_id, date_category, food_name, food_id, food_protein, food_fat, food_carbohydrate, food_sugar, food_sodium, food_brandName, food_servingDescription, time_added, food_group) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    , [userOBJ.user_id, new Date(), userOBJ.food_name,userOBJ.food_id, userOBJ.food_protein, userOBJ.food_fat, userOBJ.food_carbohydrate, userOBJ.food_sugar, 
userOBJ.food_sodium, userOBJ.food_brandName, userOBJ.food_serveDescription, new Date(), userOBJ.food_group], (err, res)=>{
    if(err !== null){
        throw err;
    }
});
  }

  
};

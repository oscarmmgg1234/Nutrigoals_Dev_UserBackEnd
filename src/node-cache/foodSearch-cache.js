const serverCache = require("node-cache");

const foodsearch_cache = new serverCache();

module.exports = duration => (req, res,next) =>{

    if(req.method !== 'GET'){
        return next();
    }
    const key = `${req.body.page_number}${req.body.foodID}`;
    const cachedResponse = foodsearch_cache.get(key);

    if(cachedResponse){
        res.send(cachedResponse);
   }
    else{
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            foodsearch_cache.set(key, body, duration); 
        }
        next();
    }
    

}

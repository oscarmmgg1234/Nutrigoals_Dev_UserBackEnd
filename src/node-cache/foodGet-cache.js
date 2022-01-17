const serverCache = require("node-cache");

const foodget_cache = new serverCache();

module.exports = duration => (req, res,next) =>{

    if(req.method !== 'GET'){
        return next();
    }
    const key = req.body.foodID;
    const cachedResponse = foodget_cache.get(key);

    if(cachedResponse){
        res.send(cachedResponse);
   }
    else{
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            foodget_cache.set(key, body, duration); 
        }
        next();
    }
    

}

'use strict'

module.exports = function(app, db) {
    
    var coll = db.collection('sites');

    app.get('/new/:url', function(req, res) {

        var obj = {};

        if (!validateURL(req.params.url)) {

            obj = {"original_url": "invalid URL used, please use 'http://www.example.com' format"};

        } else {
            
            obj = {
            "original_url": req.params.url,
            "short_url": generateURL()
            };

            

            coll.insert(obj, function(err, docs) {
                if (err) {
                    throw new Error('Cannot insert into collection');
                } else {
                    console.log(docs, "inserted");          
                }
            });
        }

        res.send(obj);
        
    });

    // generate random URL number
    function generateURL() {
        var randomNum = ("000" + Math.floor(Math.random() * 1000)).slice(-4);
        return "https://THIS-URL/" + randomNum;
    }

    // check validity of url
    function validateURL(url) {

        var patt = /(http|https):\/\/www\.\w+\.\w+(\.\w+)?/g;

        if (patt.test(url)) {
            console.log("Valid URL");
            return true;
        } else {
            console.log("Invalid URL");
            return false;
        }
    }

}


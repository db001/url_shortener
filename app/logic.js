'use strict'

module.exports = function(app, db) {
    
    var coll = db.collection('sites');

    app.get('/new/:url*', function(req, res) {

        var obj = {};
        var reqUrl = req.url.slice(5); // Slice removes '/new/' from the request path

        if (!validateURL(reqUrl)) {

            obj = {"original_url": "invalid URL used, please use 'http://www.example.com' format"};

        } else {
            
            obj = {
            "original_url": reqUrl,
            "short_url": generateURL()
            }            

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
    function validateURL(url_to_check) {

        var patt = /(http|https):\/\/www\.\w+\.\w+(\.\w+)?/g;

        if (patt.test(url_to_check)) {
            console.log("Valid URL");
            return true;
        } else {
            console.log("Invalid URL");
            return false;
        };
    };

    function noHTTP(URL) {
        if (URL.slice(0, 5) == "https") {
            return URL.slice(6);
        } else {
            return URL.slice(5);
        }
    };

}


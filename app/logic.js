'use strict'

module.exports = function(app, db) {
    
    var coll = db.collection('sites');

    app.get('/new/:url*', function(req, res) {

        var obj = {};
        var reqUrl = req.url.slice(5); // Slice removes '/new/' from the request path

        if (!validateURL(reqUrl)) {

            obj = { 
                "original_url": "invalid URL used, please use 'http://www.example.com' format"
            }

            res.send(obj);

        } else {
            
            obj = {
            "original_url": reqUrl,
            "short_url": generateURL()
            }

            res.send(obj);          

            coll.insert(obj, function(err, docs) {
                if (err) {
                    throw new Error('Cannot insert into collection');
                } else {
                    console.log("Doc inserted");
                }
            });
        }

    });

    app.get('/:shortUrl', function(req, res) {
        
        // Get 4 digit short_url request
        var trimUrl = req.path.slice(1);

        coll.findOne(
            { "short_url": trimUrl },
            { "_id": 0, "original_url": 1 },
            function(err, result) {
                if(err) {
                    res.send(err);
                } else if(!result) {
                    console.log("Short URL not found");
                    res.send("Short URL not found");
                } else {
                    res.redirect(302, result.original_url);
                    res.end();
                }            
            });
    });

    // generate random URL number
    function generateURL() {
        var randomNum = ("000" + Math.floor(Math.random() * 1000)).slice(-4);
        return randomNum;
    };

    // check validity of url
    function validateURL(url_to_check) {

        var patt = /(http|https):\/\/www\.\w+\.\w+(\.\w+)?/g;

        if (patt.test(url_to_check)) {
            console.log("Valid URL");
            return true;
        } else {
            console.log("Invalid URL");
            return false;
        }
    };

}


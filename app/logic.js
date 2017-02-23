'use strict'

module.exports = function(app, db) {
    
    var coll = db.collection('sites');

    app.get('/new/:url', function(req, res) {

        var obj = {
            "original_url": req.params.url,
            "short_url": generateURL()
        };

        res.send(obj);

        coll.insert(obj, function(err, docs) {
            if (err) {
                throw new Error('Cannot insert into collection');
            } else {
                console.log(docs, "inserted");          
            }
        });

    });

    // generate random URL number
    function generateURL() {
        var randomNum = ("000" + Math.floor(Math.random() * 1000)).slice(-4);
        return "https://THIS-URL/" + randomNum;
    }

}

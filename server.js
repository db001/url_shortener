'use strict'

var express = require('express');
var mongo = require('mongodb').MongoClient;

// Mongo db url
var url = 'mongodb://localhost:27017/urls';

var app = express();

mongo.connect(url, function(err, db) {
    if (err) {
        throw new Error('Failed to connect to database');
    } else {
        console.log("Database connected at", url);
    }
    
    var coll = db.collection('sites');

    app.use('/', express.static(__dirname + '/public'));

    app.get('/new/:url', function(req, res) {

        var obj = {
            "original_url": req.params.url,
            "short_url": "https://THIS-URL/1234"
        };

        coll.insert({
            obj
            }, {
                original_url: 1,
                short_url: 1,
                _id: 0        
            }, function(err, docs) {
            if (err) {
                throw new Error('Cannot insert into collection');
            } else {
                console.log(docs, "inserted");
                res.send(obj);
            }
        });

        db.close();
    });

    var port = process.env.PORT || 3000;

    app.listen(port, function() {
        console.log("Node listening on port", port);
    })

})
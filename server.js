'use strict'

var express = require('express');
var mongo = require('mongodb').MongoClient;

// Mongodb db url
var url = 'mongodb://localhost:27017/urls';

var app = express();

mongo.connect(url, function(err, db) {
    if (err) {
        throw new Error('Failed to connect to database');
    } else {
        console.log("Database connected at", url);
    }
    db.close();

    app.use('/', express.static(__dirname + '/public'));


    var port = process.env.PORT || 3000;

    app.listen(port, function() {
        console.log("Node listening on port", port);
    })

})
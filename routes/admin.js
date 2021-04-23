var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Besser Sterben - eine Testfahrt mit dem Tod' });
});

router.get('/refresh', function(req, res, next) {
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
        if (err) console.log(err);
        var dbo = db.db("sterben");
        dbo.collection("onboarding").find({ "boarded": true, "main": false }, { sessionTime: 0, boarded: 0, main: 0 }).toArray(function(err, boarded) {
            res.json(boarded);
            db.close();
        });
    });
});

router.get('/setmain', function(req, res, next) {
    setMain(req, res);
});

function setMain(req, res) {
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, function(err, db) {
        console.log(err);
        var dbo = db.db("sterben");
        var newValues = { $set: { main: true } };
        dbo.collection("onboarding").updateOne({ _id: new mongo.ObjectID(req.query.id) }, newValues, function(err, result) {
            console.log("1 document updated");
            db.close();
            res.status(200);
        });
    });
}

module.exports = router;
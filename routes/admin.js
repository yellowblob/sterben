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
    refresh(res);
});

async function refresh(res) {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    try {
        await client.connect();

        result = await findBoarded(client);

        res.json(result);
    } finally {
        client.close();
    }
}

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

async function findBoarded(client) {
    const cursor = client.db("sterben").collection("onboarding").find({ "boarded": true, "main": false }, { sessionTime: 0, boarded: 0, main: 0 });

    const results = await cursor.toArray();
    return results;
}

async function findOneListingByID(client, id) {
    const result = await client.db("sterben").collection("onboarding").findOne({ _id: new mongo.ObjectID(id) });

    if (result) {
        return result;
    } else {
        console.log(`No listings found with the id '${id}'`);
    }
}

async function updateListingById(client, idOfListing, updatedListing) {
    const result = await client.db("sterben").collection("onboarding")
        .updateOne({ _id: idOfListing }, { $set: updatedListing });
}

module.exports = router;
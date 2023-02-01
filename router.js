const express = require("express");
const { MongoClient } = require('mongodb');

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

router.post('/search', async (req, res) => {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    const dbName = 'ex3';

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('artists');
    var findResult = [];
    if (req.body.searchString.length > 0){
        findResult = await collection.find({ DisplayName: { $in: [new RegExp(req.body.searchString, "i")] } }
        ).limit(50).toArray();        
    }
    client.close()
    res.json(findResult)
})

module.exports = router;

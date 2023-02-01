/****************************************************/
// Populate database from json file: countries and capital cities //
/***************************************************/

const { MongoClient } = require("mongodb");
const fs = require('fs');

const uri = 'mongodb://127.0.0.1:27017'; // Connection URI
const client = new MongoClient(uri);

async function run() {
    try {
        const db = client.db("ex3");

        fs.readFile('MoMA.json', (err, data) => {
            
            if (err) throw err;
            let artistsJSON = JSON.parse(data);    // read data from json file
                
            const collection = db.collection('artists');      // Get the countries collection

            collection.insertMany(artistsJSON, function(err, result) {  // Insert documents
                if(err){throw err}
                console.log(result);
                client.close();
                console.log("Collection updated.")    
            });     
        });

    } catch {
        console.log("error inserting documents...")
    }

}

run().catch(console.dir);



const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const Car = require('./src/carModel');

// Create an Express application
const app = express();
let db;
// MongoDB connection URI
const uri = 'mongodb://mongodb:27017/madMikesCars';

const testCar = new Car({
  _id: new ObjectId(),
  vin: "AB123456789",
  plateNumber: "TESTCAR",
  state: "AL",
  make: "Toyota",
  model: "Camry",
  year: 2020,
  ownerName: "Jim",
  ownerAddress: "100 maple st",
  dlNumber: "8001234",
  problemDescription: "broken window",
  timeInShop: 20,
  workers: ["Stan", "Lee"],
})
// const carSchema = new mongoose.Schema({
//   vin: String,
//   plateNumber: String,
//   state: String,
//   make: String,
//   model: String,
//   year: Number,
//   ownerName: String,
//   ownerAddress: String,
//   dlNumber: String,
//   problemDescription: String,
//   timeInShop: Number,
//   workers: [String],
// });


async function dbConnect() {
// Connect to MongoDB
  try{
    const client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');
    db = await client.db('madMikesCars');
    console.log("Connected to db")
    const result = await db.collection('cars').insertOne(testCar);
    console.log(result);
  }
  catch(e){
    console.log(e); 
    throw(e)
  }
}

app.use(express.json())


// Define a route handler for the root path
app.get('/cars', (req, res) => {
    db.collection('cars').find().toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    })
});

app.post('/cars', (req, res) => {
  const body = req.body
  console.log(body);
  db.collection('cars').insertOne(body).then((docs) => {
    res.status(201).send({success: true});
  }).catch(err => {
    console.error('Failed to insert customer to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

// Start the server on port 3000
app.listen(3000, () => {
  dbConnect().then (() => {
    console.log('Server is running on port 3000');
  });
});
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())




//l2f1imIwDWth6sKy
const uri = "mongodb+srv://rent-db:l2f1imIwDWth6sKy@cluster0.zpccury.mongodb.net/?appName=Cluster0";




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();


  const db = client.db('rent-db')
  const modelCollections =db.collection('rents')

app.get('/rents',async(req, res)=> {
  const result =await modelCollections.find().toArray()


  res.send(result)
})



 
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is Running Successfully')
})


app.listen(port, () => {
  console.log(`Example App Running on Port ${port}`)
})
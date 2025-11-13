const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
  const bookingCollection = db.collection('bookings');

app.get('/rents',async(req, res)=> {
  const result =await modelCollections.find().toArray()


  res.send(result)
})

//get
app.get('/rents/:id',async(req,res) => {
  const {id} =req.params
  console.log(id)
  const objectId = new ObjectId(id)

  const result = await modelCollections.findOne({_id: objectId})

  res.send({
    success:true,
    result
  })
})

//post method
app.post('/rents', async(req,res) => {
     const data = req.body
    const result= await modelCollections.insertOne(data)
    res.send({
      success:true,
    result
    })
})

//my-listings
app.get('/my-listings', async(req,res) => {
    const email =req.query.email
    const result = await modelCollections.find({providerEmail: email}).toArray()

    res.send({
      result
    })
})

//Update Car
app.put('/rents/:id', async(req,res) => {
  const {id} = req.params
  const data= req.body

  console.log(id)
  console.log(data)
  const objectId = new ObjectId(id)
  const filter = {_id: objectId}
  const update = {
    $set: data
  }

  const result = await modelCollections.updateOne(filter,update)

  res.send({
    success:true,
    result
  })
})

//Delete Car
app.delete('/rents/:id', async(req,res) => {
  const {id} = req.params
   const objectId = new ObjectId(id)
   const filter = {_id: objectId}
  const result = await modelCollections.deleteOne(filter)

  res.send({
    success: true,
    result
  })
})

//6 Newest car

app.get('/newest-cars', async(req,res) => {
  const result = await modelCollections.find().sort({createdAt: 'desc'}).limit(6).toArray()
  console.log(result)
  res.send(result)
})
 

//search
app.get('/search', async(req,res) => {
  const search_text = req.query.search 
 const  result = await modelCollections.find({name:{$regex: search_text, $options: "i"}}).toArray()
 res.send(result)
})

//Bookings
app.post('/bookings', async (req, res) => {
  const bookingData = req.body;

  // Check car exists
  const car = await modelCollections.findOne({ _id: new ObjectId(bookingData.carId) });
  if (!car) {
    return res.status(404).send({ success: false, message: "Car not found" });
  }

  // 2. Prevent double booking
  if (car.status === "unavailable") {
    return res.status(400).send({ success: false, message: "Car already booked" });
  }

  // 3. Save booking
  const bookingResult = await bookingCollection.insertOne({
    ...bookingData,
        name: bookingData.name || car.name,
    bookingDate: new Date(),
    status: "confirmed"
  });

  // 🔹 4. Update car status
  const updateResult = await modelCollections.updateOne(
    { _id: new ObjectId(bookingData.carId) },
    { $set: { status: 'unavailable' } }
  );

  // 5. Send both results
  res.send({
    success: true,
    booking: bookingResult,
    update: updateResult
  });
});

// Get bookings for a specific user
app.get('/my-bookings', async (req, res) => {
    const email =req.query.email
    const result = await bookingCollection.find({userEmail: email}).toArray()

    res.send({
      result
    })
   
});


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
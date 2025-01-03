import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ServerApiVersion } from 'mongodb';
const app = express();

const port = process.env.PORT === 'production' || 5002;

//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection = client.db('boss').collection('menu');
    const reviewCollection = client.db('boss').collection('reviews');
    const cartCollection = client.db('boss').collection('carts');

    //@      GET
    //@desc  Get All Menu
    //@route '/menu'

    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    //@cart collection
    //@ POST
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    //@ get carts collection
    app.get('/carts', async (req, res) => {
      const email = req.query.email 
      const query = {email: email}
      const result = await cartCollection.find({email}).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'.green
        .inverse
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//Route
app.get('/', (req, res) => {
  res.send('Home is runnig');
});

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});

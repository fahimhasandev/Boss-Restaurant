import express from 'express';
import colors from 'colors';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
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
    const userCollection = client.db('boss').collection('users');

    /**
     *
     * @Token
     */
    //middleWares
    const verifyToken = (req, res, next) => {
      //console.log('Inside Verify Token', req.headers.authorization);

      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }

      const token = req.headers.authorization.split(' ')[1];

      // if(!token){
      //   return res.status(41).send({ message: 'Unauthorized access' });
      // }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(41).send({ message: 'Unauthorized access' });
        }
        req.decoded = decoded;
        //console.log(decoded)
      });

      next();
    };

    // use varify Admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      console.log('Line 67:', email)
      const query = { email: email };

      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'admin';

      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      next();
    };

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10h',
      });

      res.send({ token });
    });

    /**
     *  @Routes - USERs related api
     *  @Methods - POST
     */

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.get(
      '/users/admin/:email',
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { email } = req.params;

        // if query params email and decodec email are not same, unauthorized access
        if (email !== req.decoded.email) {
          return res.status(403).send({ message: 'forbidden access' });
        }

        // find the user email with query
        const query = { email: email };
        const user = await userCollection.findOne(query);
        let admin = false;
        if (user) {
          admin = user?.role === 'admin';
        }

        res.send({ admin });
      }
    );

    app.post('/users', async (req, res) => {
      const user = req.body;

      //console.log(user);
      //insert email if user doesn't exists:
      // you can do this many ways(1. email unique, 2. upsert 3. simple checking)
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'User alreay exists', insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch(
      '/users/admin/:id',
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: 'admin',
          },
        };

        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    //@      Menu
    //@desc  Get All Menu
    //@route '/menu'

    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    });

    app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
      const {id} = req.params;
      console.log('Line 182:' , id)
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
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
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find({ email }).toArray();
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
  console.log(`Server is running on port ${port}`.blue.inverse);
});

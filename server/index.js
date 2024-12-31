import express from 'express';
import cors from 'cors';
const app = express();

const port = process.env.PORT === 'production' || 5002;

//middleware
app.use(cors());
app.use(express.json());

//Route
app.get('/', (req, res) => {
  res.send('Home is runnig');
});

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});

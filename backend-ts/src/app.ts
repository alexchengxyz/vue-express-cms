import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connect';
import { notFound, errorHandler } from './middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URI || '';

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser(process.env.PASSPORT_SECRET));

// api

app.use(notFound);
app.use(errorHandler);

connectDB(mongoUrl).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
}).catch((err) => {
  console.error(err);
});

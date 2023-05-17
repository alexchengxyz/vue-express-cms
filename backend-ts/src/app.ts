import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connect';
import { notFound, errorHandler, authentication } from './middleware';
// routes
import { auth, users } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URI || '';

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser(process.env.PASSPORT_SECRET));

// api
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', authentication, users);

app.use(notFound);
app.use(errorHandler);

connectDB(mongoUrl).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
}).catch((err) => {
  console.error(err);
});

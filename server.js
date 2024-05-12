import express from 'express';
import mongoose from 'mongoose';
import { createContact, getContactSubmissions } from './controllers/contactController.js';
import { createSchedule, getScheduledServices } from './controllers/scheduleController.js';
import { login, signup } from './controllers/userController.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

const port = process.env.PORT;
const mongodb = process.env.MONGODB;
const dbUrl = process.env.DBNAME;
const frontendUrl = process.env.FRONTENDURL;

app.use(express.json());
app.use(cors({
  origin: frontendUrl,
  credentials: true,
}));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb);
    console.log(`MongoDB connected successfully with Database : ${dbUrl} and with host: ${conn.connection.host} ${frontendUrl}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.post('/api/contact', createContact);
app.get('/api/contact', getContactSubmissions);
app.post('/api/schedule', createSchedule);
app.get('/api/schedule', getScheduledServices);

app.post('/api/login', login);
app.post('/api/signup', signup);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Exporting app for testing purposes if needed

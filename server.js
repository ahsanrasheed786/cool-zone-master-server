import express from 'express';
import mongoose from 'mongoose';
import { createContact, deleteContact, getContactSubmissions } from './controllers/contactController.js';
import { createSchedule, deleteScheduledService, getScheduledServices } from './controllers/scheduleController.js';
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
app.delete('/api/contact/:id', deleteContact);

app.post('/api/schedule', createSchedule);
app.get('/api/schedule', getScheduledServices);
app.delete('/api/schedule/:id', deleteScheduledService);


app.post('/api/login', login);
app.post('/api/signup', signup);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 

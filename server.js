const express = require('express');
const mongoose = require('mongoose');
const contactController = require('./controllers/contactController');
const scheduleController = require('./controllers/scheduleController');
const userController = require('./controllers/userController');
const dotenv=require('dotenv')
const cors=require('cors');
const app = express();

dotenv.config();

const  port =process.env.PORT
const mongodb =process.env.MONGODB
const dbUrl = process.env.DBNAME
const frontendUrl = process.env.FRONTENDURL

app.use(express.json());
app.use(cors(
    {
      origin: frontendUrl,
      credentials: true,
    }
));


const connectDB = async () => {
  try {
   const conn = await mongoose.connect(mongodb);
    console.log(`MongoDB connected successfully with Database : ${dbUrl} and with host: ${conn.connection.host} ${frontendUrl}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
connectDB()

app.post('/api/contact', contactController.createContact);
app.get('/api/contact', contactController.getContactSubmissions);
app.post('/api/schedule', scheduleController.createSchedule);
app.get('/api/schedule', scheduleController.getScheduledServices);

app.post('/api/login', userController.login);
app.post('/api/signup', userController.signup);

app.listen(port , () => {
  console.log(`Server is running on port ${ port }`);
});
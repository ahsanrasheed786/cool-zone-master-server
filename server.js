const express = require('express');
const mongoose = require('mongoose');
const contactController = require('./controllers/contactController');
const scheduleController = require('./controllers/scheduleController');
const userController = require('./controllers/userController');
const cors=require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(
    {
      origin: '*',
      credentials: true,
    }
));
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/contact', contactController.createContact);
app.get('/api/contact', contactController.getContactSubmissions);
app.post('/api/schedule', scheduleController.createSchedule);
app.get('/api/schedule', scheduleController.getScheduledServices);

app.post('/api/login', userController.login);
app.post('/api/signup', userController.signup);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
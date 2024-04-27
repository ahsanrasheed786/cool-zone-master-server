const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const ScheduledService = mongoose.model('ScheduledService', scheduleSchema);

exports.createSchedule = async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;
    const newSchedule = new ScheduledService({ name, email, phone, service, date, time });
    await newSchedule.save();
    res.status(201).json({ message: 'Service request submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getScheduledServices = async (req, res) => {
    // console.log(req)
    
  try {
    const scheduledServices = await ScheduledService.find();
    res.status(200).json(scheduledServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
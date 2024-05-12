import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const ScheduledService = mongoose.model('ScheduledService', scheduleSchema);


const deletedScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

const deletedScheduledService = mongoose.model('DeletedScheduledService', deletedScheduleSchema);

export const createSchedule = async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;
    const newSchedule = new ScheduledService({ name, email, phone, service, date, time });
    await newSchedule.save();
    res.status(201).json({ message: 'Service request submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getScheduledServices = async (req, res) => {
  try {
    const scheduledServices = await ScheduledService.find();
    res.status(200).json(scheduledServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteScheduledService = async (req, res) => {
  const {id}=req.params
// console.log(id)
  try {
    const deletedService = await ScheduledService.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const deleted = new deletedScheduledService(deletedService);
    await deleted.save();
    res.status(201).json({ message: 'Service form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }}
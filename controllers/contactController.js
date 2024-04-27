const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String,},
  phone: { type: String},
  address: { type: String},
  userLocation: { type: String},
  message: { type: String},
});

const Contact = mongoose.model('Contact', contactSchema);

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, address, userLocation, message } = req.body;
    const newContact = new Contact({ name, email, phone, address, userLocation, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContactSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
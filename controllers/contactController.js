import mongoose, { model } from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  userLocation: { type: String },
  message: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);


const deletedContactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  userLocation: { type: String },
  message: { type: String },
});

const DeletedContact = mongoose.model('DeletedContact', deletedContactSchema);

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, address, userLocation, message } = req.body;
    const newContact = new Contact({ name, email, phone, address, userLocation, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const {id}=req.params
// console.log(id)
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    const deleted = new DeletedContact(deletedContact);
    await deleted.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }}

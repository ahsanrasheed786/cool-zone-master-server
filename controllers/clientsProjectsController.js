const mongoose = require('mongoose');

const clientProjectSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['Client', 'Project'] },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ClientProject = mongoose.model('ClientProject', clientProjectSchema);

exports.getClientsAndProjects = async (req, res) => {
  try {
    const clientsAndProjects = await ClientProject.find();
    res.status(200).json(clientsAndProjects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createClientProject = async (req, res) => {
  try {
    const { type, name, description } = req.body;
    const newClientProject = new ClientProject({ type, name, description });
    await newClientProject.save();
    res.status(201).json(newClientProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
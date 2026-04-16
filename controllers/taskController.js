const Task = require('../models/Task');

exports.list = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.json(Array.isArray(tasks) ? tasks : []);
  } catch {
    return res.json([]);
  }
};

exports.getById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.json(task);
  } catch {
    return res.status(500).json({ message: 'Erro' });
  }
};

exports.create = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch {
    return res.status(400).json({ message: 'Erro' });
  }
};

exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(task);
  } catch {
    return res.status(400).json({ message: 'Erro' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ message: 'ok' });
  } catch {
    return res.status(500).json({ message: 'Erro' });
  }
};
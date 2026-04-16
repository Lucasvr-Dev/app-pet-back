const Task = require('../models/Task');

// 🔥 LISTAR
exports.list = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    // garante sempre array
    return res.json(tasks);
  } catch (err) {
    console.log("Erro list:", err);
    return res.status(500).json([]);
  }
};

// 🔥 BUSCAR POR ID
exports.getById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao buscar tarefa' });
  }
};

// 🔥 CRIAR
exports.create = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (err) {
    console.log("Erro create:", err);
    return res.status(400).json({ message: 'Erro ao criar tarefa' });
  }
};

// 🔥 ATUALIZAR
exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json(task);
  } catch (err) {
    console.log("Erro update:", err);
    return res.status(400).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// 🔥 DELETAR
exports.delete = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Tarefa removida' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};
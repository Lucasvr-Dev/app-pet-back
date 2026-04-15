const DiaryEntry = require('../models/DiaryEntry');
const Pet = require('../models/Pet');


exports.listEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.find().populate('petId');
    res.json(entries);
  } catch {
    res.status(500).json({ message: 'Erro ao listar registros.' });
  }
};


exports.getEntryById = async (req, res) => {
  try {
    const entry = await DiaryEntry.findById(req.params.id).populate('petId');

    if (!entry) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }

    res.json(entry);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar registro.' });
  }
};


exports.createEntry = async (req, res) => {
  try {
    const { petId } = req.body;

    
    const petExists = await Pet.findById(petId);
    if (!petExists) {
      return res.status(400).json({ message: 'Pet inválido.' });
    }

    const entry = await DiaryEntry.create(req.body);
    res.status(201).json(entry);
  } catch {
    res.status(400).json({ message: 'Erro ao criar registro.' });
  }
};


exports.updateEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }

    res.json(entry);
  } catch {
    res.status(400).json({ message: 'Erro ao atualizar registro.' });
  }
};


exports.deleteEntry = async (req, res) => {
  try {
    const entry = await DiaryEntry.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }

    res.json({ message: 'Registro removido com sucesso.' });
  } catch {
    res.status(500).json({ message: 'Erro ao deletar registro.' });
  }
};
const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const mongoose = require('mongoose');

// CREATE
router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar pet.' });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pets.' });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado.' });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pet.' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado.' });
    }

    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar pet.' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado.' });
    }

    res.json({ message: 'Pet deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pet.' });
  }
});

module.exports = router;
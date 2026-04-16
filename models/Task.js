const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },

    status: {
      type: String,
      enum: ['pendente', 'concluido'],
      default: 'pendente'
    },

    priority: {
      type: String,
      enum: ['baixa', 'media', 'alta'],
      default: 'media'
    },

    dueDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
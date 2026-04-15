const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    happenedAt: { type: Date, required: true },

    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
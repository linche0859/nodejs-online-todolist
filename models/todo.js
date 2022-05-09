const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
  {
    content: {
      type: String,
      required: [true, '請填寫代辦內容'],
    },
    completed_at: { type: Date, default: null },
    user: { type: Schema.Types.ObjectId, ref: 'User', select: false },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Todo', schema);

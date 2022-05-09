const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, '此欄位不可為空'],
      unique: true,
      lowercase: true,
      select: false,
    },
    nickname: {
      type: String,
      required: [true, '此欄位不可為空'],
    },
    password: {
      type: String,
      required: [true, '此欄位不可為空'],
      minlength: 8,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', schema);

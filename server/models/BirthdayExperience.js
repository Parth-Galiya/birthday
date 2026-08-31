import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, maxlength: 300, default: '' },
  },
  { _id: true }
);

const birthdaySchema = new mongoose.Schema(
  {
    publicId: { type: String, unique: true, index: true, required: true },
    recipientName: { type: String, required: true, trim: true, maxlength: 80 },
    creatorName: { type: String, required: true, trim: true, maxlength: 80 },
    age: { type: Number, min: 1, max: 120, required: true },
    birthday: { type: Date, required: true },
    cakeTheme: {
      type: String,
      enum: ['strawberry', 'chocolate', 'rainbow', 'vanilla'],
      default: 'strawberry',
    },
    reasons: {
      type: [String],
      validate: (v) => !v || v.length <= 20,
    },
    photos: {
      type: [photoSchema],
      validate: (v) => !v || v.length <= 8,
    },
    letter: { type: String, maxlength: 1000, default: '' },
    theme: { type: String, default: 'bloom' },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('BirthdayExperience', birthdaySchema);

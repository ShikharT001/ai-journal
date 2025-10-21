import mongoose from 'mongoose';
const { Schema } = mongoose;
const JournalSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  mood: { type: String, enum: ['happy','sad','neutral','excited','angry'], default: 'neutral' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

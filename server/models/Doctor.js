import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  facility: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  bio: {
    type: String
  },
  availability: {
    type: [String],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
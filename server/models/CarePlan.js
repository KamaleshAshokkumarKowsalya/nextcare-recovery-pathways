import mongoose from 'mongoose';

const carePlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  goals: [{
    title: String,
    description: String,
    targetDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: Date
  }],
  tasks: [{
    title: String,
    description: String,
    frequency: String, // daily, weekly, monthly
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: Date
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date
  }],
  assignedBy: {
    name: String,
    role: String,
    date: Date
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

const CarePlan = mongoose.model('CarePlan', carePlanSchema);

export default CarePlan;

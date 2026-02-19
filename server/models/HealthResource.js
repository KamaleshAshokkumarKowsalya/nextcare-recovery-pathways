import mongoose from 'mongoose';

const healthResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['article', 'video', 'exercise', 'guide', 'tool', 'support-group', 'other'],
    required: true
  },
  tags: [String],
  content: String,
  url: String,
  imageUrl: String,
  author: String,
  publishDate: Date,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: String, // e.g., "5 min read", "30 min"
  featured: {
    type: Boolean,
    default: false
  },
  relatedConditions: [String],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const HealthResource = mongoose.model('HealthResource', healthResourceSchema);

export default HealthResource;

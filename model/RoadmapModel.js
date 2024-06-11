const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  subtopic: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  }
});

const SubtopicSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  subtopics: [ResourceSchema]
});

const RoadmapSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    required: true
  },
  pageContent: {
    duration: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    mainLine: {
      type: String,
      required: true
    },
    points: {
      type: [String],
      required: true
    }
  },
  techStack: [{
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }],
  weekWiseDetails: [{
    weekNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    subtasks: [{
      topic: {
        type: String,
        required: true
      },
      learn: [SubtopicSchema],
      practice: [SubtopicSchema]
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const RoadmapModel = mongoose.model('Roadmap', RoadmapSchema);

module.exports = RoadmapModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  subtopic: {
    type: String,
  },
  resource: {
    type: String,
  },
});

const SubtopicSchema = new Schema({
  topic: {
    type: String,
  },
  resource: {
    type: String,
  },
  subtopics: [ResourceSchema],
});

const RoadmapSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    required: true,
  },
  pageContent: {
    duration: {
      type: String,
    },
    title: {
      type: String,
    },
    mainLine: {
      type: String,
    },
    points: {
      type: [String],
    },
  },
  techStack: [
    {
      title: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  ],
  weekWiseDetails: [
    {
      weekNumber: {
        type: Number,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      subtasks: [
        {
          topic: {
            type: String,
          },
          learn: [SubtopicSchema],
          practice: [SubtopicSchema],
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const RoadmapModel = mongoose.model("Roadmap", RoadmapSchema);

module.exports = RoadmapModel;

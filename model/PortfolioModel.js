const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PortfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [String],
  tags: [String],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  comments: [CommentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const PortfolioModel = mongoose.model('portfolios', PortfolioSchema);

module.exports = PortfolioModel;

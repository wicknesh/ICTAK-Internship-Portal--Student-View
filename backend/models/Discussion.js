import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
    p_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    comments: [
      {
        commenterName: String,
        comment: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  

export default mongoose.model('Discussion', DiscussionSchema);

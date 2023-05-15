

import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  caption: String,

  image: {
    public_id: String,
    url: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
         {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    
  ],
});

const Post= mongoose.model("Post", postSchema);
export default Post;
import Post from "../models/post-schema.js";
import User from "../models/user-schema.js";
import cloudinary from "cloudinary";
import Comment from "../models/comment-schema.js";





export const likeNotification=async(req, res) => {
  try {
    const { postId } = req.params;
    const { user } = req;
     const post =Post.findById(postId);
  
    const postOwnerUserId = post.owner; 
    const newNotification = new Notification({
      user: postOwnerUserId,
      type: "like",
      postId: postId,
      isRead: false,
    });

    await newNotification.save();

    // Send notification to the post owner
    // sendNotification(newNotification);

    // Return success response
    res.status(200).json({ message: "Post liked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

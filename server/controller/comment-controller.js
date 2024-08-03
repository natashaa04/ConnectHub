
import Post from "../models/post-schema.js";
import User from "../models/user-schema.js";
import cloudinary from "cloudinary";
import Comment from "../models/comment-schema.js";
import { request } from "express";




export const commentOnPost = async (req, res) => {
    try {
      const post = await Post.findById(req.body.postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
   
      const comment =await Comment.create({
        author:req.user._id,
        post:req.body.postId,
        content:req.body.comment,
        parentComment:null,
      })
      // console.log(comment);
      
      post.comments.push(comment._id);
      post.save();
  
      return res.status(200).json({
            success: true,
            message: "Comment added",
          });
        
    } catch (error) {
      console.log("error while adding comment",error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };





  
  export const replyOnComment = async (req, res) => {
    try {

      const comment = await Comment.findById(req.body.commentId);
  
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "comment not found",
        });
      }
      console.log(comment,'comment is')
  
      const reply =await Comment.create({
        author:req.user._id,
        post:req.body.postId,
        parentComment:req.body.commentId,
        content:req.body.reply,
    
      })
      console.log('reply is' ,reply)
  
      comment.replies.push(reply._id);
      comment.save();
  
      return res.status(200).json({
            success: true,
            message: "reply added",
          });
     
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  



  
export const likeAndUnlikeComment = async (req, res) => {
    try {
      console.log(req.params)
      const comment = await Comment.findById(req.params.id);
  
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "comment not found",
        });
      }
  
      if (comment.likes.includes(req.user._id)) {
        const index = comment.likes.indexOf(req.user._id);
  
        comment.likes.splice(index, 1);
  
        await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "comment Unliked",
        });
      } else {
        comment.likes.push(req.user._id);
  
        await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "comment Liked",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  





  
  export const deleteComment = async (req, res) => {
    try {
      const post = await Post.findById(req.body.postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      } 
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });

       await post.save();
      

      const comment= await Comment.findById(req.body.commentId);
      await Comment.deleteOne(comment);


  
      

  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Comment has deleted",
        });

      } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
    



  export const deleteReply = async (req, res) => {
    try {
      const comment = await Comment.findById(req.body.commentId);
      const reply=await Post.findById(req.body.replyId);
  
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "comment not found",
        });
      } 
      comment.replies.forEach((item, index) => {
        if (item._id.toString() === req.body.replyId.toString()) {
          return comment.replies.splice(index, 1);
        }
      });

       await comment.save();
      
      await Comment.deleteOne(reply);

  
        await comment.save();
  
        return res.status(200).json({
          success: true,
          message: "reply has deleted",
        });

      } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
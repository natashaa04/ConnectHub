
import User from "../models/user-schema.js";
import jwt from "jsonwebtoken";
import Post from "../models/post-schema.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary'
import mongoose from 'mongoose';
import Comment from "../models/comment-schema.js";



export const register = async (req, res) => {
  try {
    const { avatar,name, email, password} = req.body;

    console.log(`name is  ${name} and email is ${email} and password is ${password}`);

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars"
    },function(error, result) {
       console.log(result,'result');
      console.log(error,'errror');
  },{timeout:120000});
     console.log(myCloud);

    user = await User.create({
      name,
      email,
      password,
        avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    // console.log(user);

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(`error while registering is ${error.message}`)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login=async(req,res)=>{


  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();


    res.status(200).json({
      success: true,
      user,
      token,
    });

    
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async (req, res) => {
  try {
    localStorage.removeItem("token");

    res.status(200).json({
        success: true,
        message: "Logged out",
      });
      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userPosts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;
     
    
    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    
    // removing all comments of the user from all posts
    const allComments = await Comment.find();
    const allposts= await Post.find();

    for (let i = 0; i < allComments.length; i++) {
      const comment = await Comment.findById(allComments[i]._id);
               console.log(comment);
            if(comment.author==userId ){

              if(comment.parentComment===null){

               const post = Post.findById(comment.post)

              for(let j=0;j<post.comments.length;j++){
                    if(post.comments[j]===comment._id){
                      const index= post.comments.indexOf(post.comments[j]);
                      post.comments.splice(index,1);
                    }
                  }         
            }
            else{
                   const parentComment= comment.parentComment;
                   for(let j=0;j<parentComment.replies.length;j++){
                          if(parentComment.replies[j]===comment._id){
                            const index= parentComment.replies.indexOf(parentComment.replies[j])
                            parentComment.splice(index,1);

                          }
                   }
            }
            await Comment.deleteOne(comment);
          }
          }

    // Delete all posts of the user
    for (let i = 0; i < userPosts.length; i++) {
      const post = await Post.findById(userposts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await Post.deleteOne(post);
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

      // for (let j = 0; j < post.comments.length; j++) {
      //   if (post.comments[j].user === userId) {
      //     post.comments.splice(j, 1);
      //   }
      // }
      // await Post.deleteOne(post);


    // removing all likes of the user from all posts

    for (let i = 0; i < allposts.length; i++) {
      const post = await Post.findById(allposts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await User.deleteOne(user);


    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    // console.log(req.user._id,'sss');
    const user = await User.findOne({_id:req.user._id}) .populate('followers') 
    .populate('following') 
    .populate({
      path: 'posts',
      populate: {
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User' 
        }
      }
    });
   
      // //  console.log(user,'user');
      // //  console.log('comments on post is' ,user.posts.comments)

      // user.posts.forEach((post) => {
      //    console.log(`Post: ${post.caption}`);
      
      //   post.comments.forEach((comment) => {
      //     console.log(`- Comment: ${comment.content}`);
      //     console.log(`  Author: ${comment.author.name}`);
      //   });
      // });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error,'error');
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id) .populate('followers') 
    .populate('following') 
    .populate({
      path: 'posts',
      populate: {
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User' 
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i])
      .populate("owner").populate("likes").populate({
        path: 'comments',
        populate: [
          { path: 'author',
           model: 'User'
           },
      
       {
        path: 'likes',
        model: 'User'
      },
        {
        path: 'parentComment',
        model: 'Comment',
        populate: {
          path: 'author',
          model: 'User',
          select:"avatar email name"
        }
      },
         {
        path: 'replies',
        model: 'Comment',
        populate: [
          {
            path: 'author',
            model: 'User',
            select:"avatar email name"
          },
          {
            path: 'likes',
            model: 'User'
          }
        ]
      }
    ] });
    
     
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes owner"
      ).populate({
        path: 'comments',
        populate: { path: 'author', model: 'User' }
      });
      posts.push(post);
    }


    res.status(200).json({
      success: true,
      posts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Post from "../models/post-schema.js";
import User from "../models/user-schema.js";
import cloudinary from "cloudinary";
import Comment from "../models/comment-schema.js";
// import { postOfFollowingFailure } from "../../client/src/Reducers/User.js";

export const createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload_large(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };
  

    const post = await Post.create(newPostData);
    // console.log(post);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);


    const comments = await Post.find({
      post: {
        $in: post._id,
      },
    })

    await Comment.deleteMany(comments);

    await Post.deleteOne(post);

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes").populate({
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
        model: 'User'
      }
    },
       {
      path: 'replies',
      model: 'Comment',
      populate: [
        {
          path: 'author',
          model: 'User'
        },
        {
          path: 'likes',
          model: 'User'
        }
      ]
    }
  ] });
  

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

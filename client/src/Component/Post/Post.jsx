import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);
  

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  
  // converting date string into local date
    const date = new Date(createdAt);
    const formatedDate = date.toLocaleDateString();

     let shortName=ownerName;
    if (ownerName.length > 8) {
      const shortenedWords = ownerName.slice(0, 8);
        shortName = shortenedWords.concat('...');
    }
  
  const handleLike = async () => {
    setLiked(!liked);

    await likePost(postId);

    if (isAccount) {
      getMyPosts();
    } else {
      getFollowingPosts();
    }
  };

  const addCommentHandler = async (e) => {
    
    e.preventDefault();
     console.log('comment is here')

    await addCommentOnPost(postId, commentValue);
    setCommentToggle(false);

     if (isAccount) {
      getMyPosts();
    } else {
      getFollowingPosts();
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    updatePost(captionValue, postId);
       getMyPosts();
       loadUser();
  };

  const deletePostHandler = async () => {
    await deletePost(postId);
        getMyPosts();
         loadUser();
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);
  // console.log(`comments is ${comments}`)

  return (
    <div className="post">
      <div className="userDetail">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "2.8vmax",
            width: "2.8vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography className="userName" >{shortName}</Typography>
        </Link>
        {isAccount ? (
          <Button style={{position:"absolute",marginLeft:"90%",}} onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
  
        </div>
   
       <div className="dateBox">Posted on {formatedDate}</div>
      <img src={postImage} alt="Post" />

      <div className="postDetails">
        

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center",marginLeft:"2%",wordWrap: "break-word", width: "95%" }}
        >
          {caption}
        </Typography>
      </div>

      
      <div className="postFooter">
        <Button onClick={handleLike}  style={{ margin:'0',padding:'0'}} >
          {liked ? <Favorite style={{ color: "red" }} /> :<FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
      
      </div>
       <button className="likeNumbersButton"
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin:'0',
          fontSize:"small",
         buttom:'0',
          
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography className="likeNumbers" >{likes.length} Likes</Typography>
      </button> 

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="LikeDialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog  className="mainDialogBox"
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
         
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
    
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              item.parentComment==null &&
            
              <CommentCard
                userId={item.author._id}
                name={item.author.name}
                avatar={item.author.avatar.url}
                comment={item.content}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
                replies={item.replies}
                likes={item.likes}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog className="mainDialogBox"
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="updateDialogBox">
          <Typography variant="h4" className="UpdateCaption">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input className="commentInput"
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
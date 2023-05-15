



import { Button, Typography,Dialog} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";
import { useState } from "react";
import {
  
  Favorite,
  FavoriteBorder,

} from "@mui/icons-material";
import ReplyCard from "../Reply/ReplyCard";
import { useEffect } from "react";

import { likeComment , addReplyOnComment ,deleteReply} from "../../Actions/Post";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  replies,
  likes,
}) => {
  const { user } = useSelector((state) => state.user);
  

  const [liked, setLiked] = useState(false);
  const [replyBox, setReplyBox] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [showReplies, setShowReplies] = useState(false); 

  const deleteCommentHandle = () => {
    deleteCommentOnPost(postId, commentId);

    if (isAccount) {
      getMyPosts();
    } else {
      getFollowingPosts();
    }
  };

  const handleLike = async() => {
    setLiked(!liked)
    await likeComment(commentId);

    if (isAccount) {
      getMyPosts();
    } else {
      getFollowingPosts();
    }
  };


    const handleReply = async (e) => {
      e.stopPropagation();

        await addReplyOnComment(commentId, postId, replyValue);
    
        if (isAccount) {
          await getMyPosts();
        } else {
          await getFollowingPosts();
        }
      
    
      setReplyBox(false);
    };
    useEffect(() => {
      likes.forEach((item) => {
        if (item._id === user._id) {
          setLiked(true);
        }
      });
    }, [likes, user._id]);

    // console.log(replies);
    
    let shortName=name;
  if (name.length > 8) {
    const shortenedWords = name.slice(0, 8);
      shortName = shortenedWords.concat('...');
  }

  return (
    <div className="commentUser">
      <div className="userInfo">
        <Link to={`/user/${userId}`}>
          <img src={avatar} alt={name} />
          <Typography style={{ minWidth: "6vmax" }} className= "userName">{shortName}</Typography>
        </Link>
        {isAccount ? (
          <Button onClick={deleteCommentHandle}>
            <Delete />
          </Button>
        ) : userId === user._id ? (
          <Button onClick={deleteCommentHandle}>
            <Delete />
          </Button>
        ) : null}
      </div>
      <div className="commentData">
        <Typography className="commentText">{comment}</Typography>
  
        <div className="replyAndLikeBtn">
      
          <Button onClick={handleLike}>
          <Typography style={{'marginButtom':'3%'}}>{likes.length}</Typography>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

          
          <Button onClick={()=>setReplyBox(!replyBox)} style={{ color: "grey" }}>
            Reply
          </Button>
          {replies.length > 0 && (
            <Button
              className="viewRepliesButton"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? `Hide ${replies.length} replies`
                : `View all ${replies.length} replies`}
            </Button>
          )}

        </div>
        </div>
        {showReplies && (replies.map(
          (item)=>(
            <>
          
              <ReplyCard 
             UserId={item.author._id}
              Name={item.author.name}
            Avatar={item.author.avatar.url}
             Reply={item.content}
             ReplyId={item._id}
            Key={item._id}
             PostId={item.post}
             IsAccount={isAccount}
            />
            </>
            

          )
        ) )
        }
           


        <Dialog open={replyBox} onClose={() => setReplyBox(!replyBox)} disablePortal>

<div className="DialogBoxx">

<form className="commentForm" onSubmit={handleReply}>
            <input
              type="text"
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
              placeholder="Reply Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
     
</div>
</Dialog>
      </div>
    
  );
};

export default CommentCard;




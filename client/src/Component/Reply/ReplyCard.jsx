import "./ReplyCard.css";


import { Button, Typography,Dialog} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";




const ReplyCard=({
     UserId,
       Name,
    Avatar,
     Reply,
    ReplyId,
     Key,
    PostId,
     IsAccount,
}

)=>{


    const { user } = useSelector((state) => state.user);

    const deleteReplyHandle=()=>{
      deleteCommentOnPost(PostId,ReplyId)

      if (IsAccount) {
        getMyPosts();
      } else {
        getFollowingPosts();
      }
    }
       let shortName=Name;
      console.log(Name.length);
    if (Name.length > 6) {
      const shortenedWords = Name.slice(0, 6);
        shortName = shortenedWords.concat('...');
    }
    
    return(
       <>
        <div className="replyUser">
      <div className="userInfo">
        <Link to={`/user/${UserId}`}>
          <img src={Avatar} alt={Name} />
          <Typography style={{ minWidth: "6vmax" }}>{shortName}</Typography>
        </Link>
        {IsAccount ? (
          <Button onClick={deleteReplyHandle}>
            <Delete />
          </Button>
        ) : UserId === user._id ? (
          <Button onClick={deleteReplyHandle}>
            <Delete />
          </Button>
        ) : null}
      </div>
      <div className="replyData">
        <Typography className="replyText">{Reply}</Typography>
        </div>
        </div>
       </>
    )
}
export default ReplyCard;
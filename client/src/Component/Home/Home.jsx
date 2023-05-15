import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {removeLikeError,removeLikeMessage } from "../../Reducers/Post";
import { removePostOfFollowingError} from "../../Reducers/User";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    getFollowingPosts();
    getAllUsers();
  },[]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(removePostOfFollowingError());

    
    }

    if (likeError) {
      alert.error(likeError);
      dispatch(removeLikeError());
      
    }
    if (message) {
      alert.success(message);
      dispatch(removeLikeMessage());
    
      
    }
  },[]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        <h1>Suggestions</h1>
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
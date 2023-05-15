import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    postOfFollowing: postOfFollowingReducer.reducer,
    allUsers: allUsersReducer.reducer,
    like: likeReducer.reducer,
    myPosts: myPostsReducer.reducer,
    userProfile: userProfileReducer.reducer,
    userPosts: userPostsReducer.reducer,
  },
});

export default store;
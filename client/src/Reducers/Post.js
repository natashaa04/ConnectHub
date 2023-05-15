import {  createSlice } from "@reduxjs/toolkit";

const initialState = {};

 const likeReducer = createSlice( {
  name:'post',
  initialState,
  reducers:{
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  likeCommentRequest: (state) => {
    state.loading = true;
  },
  likeCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  addCommentRequest: (state) => {
    state.loading = true;
  },
  addCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



   

  
  deleteCommentRequest: (state) => {
    state.loading = true;
  },
  deleteCommentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteCommentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },




  
  addReplyRequest: (state) => {
    state.loading = true;
  },
  addReplySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addReplyFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },


  
  
  deleteReplyRequest: (state) => {
    state.loading = true;
  },
  deleteReplySuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteReplyFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },



 




  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  




  updateCaptionRequest: (state) => {
    state.loading = true;
  },
  updateCaptionSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateCaptionFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 



  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 



  updateProfileRequest: (state) => {
    state.loading = true;
  },
  updateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatePasswordRequest: (state) => {
    state.loading = true;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  





  deleteProfileRequest: (state) => {
    state.loading = true;
  },
  deleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 




  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 




  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
 
  




  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUserFailure: (state, action) => {
    state.loading = false;

}, 
 removeLikeError:(state)=>{
  state.error=null;
},
removeLikeMessage:(state)=>{
state.message=null;
}

  }
});

 const myPostsReducer = createSlice({
  name:'myPost',
  initialState,
  reducers:{
  myPostsRequest: (state) => {
    state.loading = true;
  },
  myPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  removeMyPostsError:(state)=>{
    state.error=null;
  },
  removeMyPostsMessage:(state)=>{
state.message=null;
  }


}
});

 const userPostsReducer = createSlice( {
  name:'userPost',
  initialState,
  reducers:{
  userPostsRequest: (state) => {
    state.loading = true;
  },
  userPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  removeUserPostsError:(state)=>{
    state.error=null;
  },
  removeUserPostsMessage:(state)=>{
state.message=null;
  }


}
});

export const {
  likeRequest,
  likeSuccess,
  likeFailure,

  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,

  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,

  likeCommentRequest,
  likeCommentSuccess,
  likeCommentFailure,

  addReplyRequest,
  addReplySuccess,
  addReplyFailure,

  deleteReplyRequest,
  deleteReplySuccess,
  deleteReplyFailure,

  newPostRequest,
  newPostSuccess,
  newPostFailure,

  updateCaptionRequest,
  updateCaptionSuccess,
  updateCaptionFailure,

  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,

  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,

  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,

  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailure,

  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  followUserRequest,
  followUserSuccess,
  followUserFailure,

  removeLikeError,
  removeLikeMessage

}=likeReducer.actions

export const {
  userPostsRequest,
  userPostsSuccess,
  userPostsFailure,
  removeUserPostsError,
  removeUserPostsMessage
}=userPostsReducer.actions;

export const{myPostsRequest,
myPostsSuccess,
myPostsFailure,
removeMyPostsError,
removeMyPostsMessage
}=myPostsReducer.actions

export { likeReducer,userPostsReducer,myPostsReducer}

import axios from "axios";
import store from "../store";

import {   
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

  newPostRequest,
  newPostSuccess,
  newPostFailure,

  updateCaptionRequest,
  updateCaptionSuccess,
  updateCaptionFailure,

  deletePostRequest,
  deletePostSuccess,
  deletePostFailure
 } from "../Reducers/Post";

 import { useDispatch } from "react-redux";

 const URL='http://localhost:8000';



export const likePost = async(id) => {
  
  try {
   store.dispatch(likeRequest());
    

    const { data } = await axios.get(`${URL}/api/v1/post/${id}`,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
    store.dispatch(likeSuccess(data.message));
    
  } catch (error) {
    console.log(error);
    store.dispatch(likeFailure(error.response.data.message));
 
  }
};


export const likeComment = async(commentId) => {
     const id=commentId;
  try {
   store.dispatch(likeCommentRequest());
   const token = localStorage.getItem("token");
     

    const { data } = await axios.get(`${URL}/api/v1/likeComment/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    
    },
  );
    store.dispatch(likeCommentSuccess(data.message));
    
  } catch (error) {
    console.log(error);
    store.dispatch(likeCommentFailure(error.response.data.message));
 
  }
};





export const addCommentOnPost = async(id, comment) => {
     const postId=id;
  try {
    store.dispatch(addCommentRequest());
    
    const { data } = await axios.put(
      `${URL}/api/v1/post/comment/${id}`,
      {
        comment,postId
      },
      {
        headers: {
          "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    store.dispatch(addCommentSuccess(data.message));

  } catch (error) {
    console.log(`error while commenting is ${error.response.data.message}`);
    store.dispatch(addCommentFailure(error.response.data.message))
    
  }
};





export const addReplyOnComment = async(commentId,postId, reply) => {
  const id=postId;
try {
  // store.dispatch(addReplyRequest());
   console.log('reply function is running')
   
 const { data } = await axios.put(
   `${URL}/api/v1/replyOnComment/${id}`,
   {
     reply,postId,commentId
   },
   {
     headers: {
       "Content-Type": "application/json",
     "Authorization" : `Bearer ${localStorage.getItem("token")}`,
     },
   }
  
 );

 store.dispatch(addReplySuccess(data.message));

} catch (error) {
 console.log(`error while commenting is ${error.response.data.message}`);
store.dispatch(addReplyFailure(error.response.data.message))
 
}
};






export const deleteCommentOnPost = async(id, commentId) => {
      const postId=id;
  try {
    store.dispatch(deleteCommentRequest());
    

    const { data } = await axios.delete(`${URL}/api/v1/post/comment/${id}`, {
      data: { commentId ,postId},
  
  
    headers: {
    "Authorization" : `Bearer ${localStorage.getItem("token")}`
    },
  }
    );
    store.dispatch(deleteCommentSuccess(data.message));
    
  } catch (error) {
    console.log(error);
    store.dispatch(deleteCommentFailure(error.response.data.message));
    
  }
};







export const deleteReply = async(id, commentId) => {
  const postId=id;
try {
store.dispatch(deleteReplyRequest());


const { data } = await axios.delete(`${URL}/api/v1//post/replyOnComment/${id}`, {
  data: { commentId ,postId},


headers: {
"Authorization" : `Bearer ${localStorage.getItem("token")}`
},
}
);
store.dispatch(deleteReplySuccess(data.message));

} catch (error) {
console.log(error);
store.dispatch(deleteReplyFailure(error.response.data.message));

}
};




export const createNewPost =async (caption, image) => {
  
  try {
    store.dispatch(newPostRequest());

    const { data } = await axios.post(
      `${URL}/api/v1/post/upload`,
      {
        caption,
        image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
      }
    );
    console.log(data.message)
    store.dispatch(newPostSuccess(data.message));


  } catch (error) {
    console.log(error)
    store.dispatch(newPostFailure(error.response.data.message));
  
  }
};




export const updatePost = async(caption, id) => {

  try {
    store.dispatch(updateCaptionRequest());

    const { data } = await axios.put(
      `${URL}/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    store.dispatch(updateCaptionSuccess(data.message));
    
  } catch (error) {

    store.dispatch(updateCaptionFailure(error.response.data.message));
  }
};

export const deletePost = async(id) => {
  
  try {
    store.dispatch(deletePostRequest());

    const { data } = await axios.delete(`${URL}/api/v1/post/${id}`,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });

    store.dispatch(deletePostSuccess(data.message));

  } catch (error) {

    store.dispatch(deletePostFailure(error.response.data.message));
  }
};


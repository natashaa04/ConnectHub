import axios from "axios";
import store from "../store"


import { LoginRequest ,
   LoginSuccess,
  LoginFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
  LoadUserRequest,
  LoadUserSuccess,
 
  LoadUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,

  postOfFollowingRequest,   
  postOfFollowingSuccess,
 postOfFollowingFailure,

 userProfileRequest,
 userProfileSuccess,
 userProfileFailure,

 allUsersRequest,
 allUsersSuccess,
 allUsersFailure
} from "../Reducers/User";

import {   
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

  userPostsRequest,
  userPostsSuccess,
  userPostsFailure,

  myPostsRequest,
myPostsSuccess,
myPostsFailure
 } from "../Reducers/Post";








const URL='http://localhost:8000';



export const loginUser = async(email, password) => {


  try {
    store.dispatch( LoginRequest() );

    const { data } = await axios.post(
      `${URL}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.token)
    store.dispatch( LoginSuccess( data.user));
    
  } catch (error) {
    store.dispatch(LoginFailure(error.response.data.message));
  }
 
};





export const loadUser =async() => {
  

  try {
    store.dispatch(LoadUserRequest());
  

    const { data } = await axios.get(`${URL}/api/v1/me`, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} }
    );

    store.dispatch( LoadUserSuccess(data.user));
  
  } catch (error) {
    store.dispatch(LoadUserFailure(error.response.data.message));
  }
};





export const getFollowingPosts = async() => {
  

  try {
    store.dispatch(postOfFollowingRequest())
    

    const {data}  = await axios.get(`${URL}/api/v1/posts`, 
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
   store.dispatch(postOfFollowingSuccess(data.posts));
   console.log(data);

  } catch (error) {
    console.log(error);
    store.dispatch(postOfFollowingFailure(error.response.data.message));
  }

};





export const getMyPosts = async()=> {
  

  try {
    store.dispatch(myPostsRequest());

    const  data  = await axios.get(`${URL}/api/v1/my/posts`,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
    
    store.dispatch(myPostsSuccess(data.data.posts));

  } catch (error) {
   store.dispatch(myPostsFailure(error.response.data.data.message))
  }
  
  
};



export const getAllUsers =
 async (name = "")=> {
    

    try {

      store.dispatch(allUsersRequest());

      const { data } = await axios.get(`${URL}/api/v1/users?name=${name}`, 
      { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
      store.dispatch(allUsersSuccess(data.users))
    
    } catch (error) {
      store.dispatch(allUsersFailure(error.response.data.message));
    }
 
  };




export const logoutUser = async()=> {


  try {
    store.dispatch(LogoutUserRequest());
   
    // await axios.get(`${URL}/api/v1/logout`, 
    // { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
   await localStorage.removeItem("token");

    store.dispatch(LogoutUserSuccess());
  } catch (error) {
    console.log(error);
    store.dispatch(LogoutUserFailure(error.response.data.message))
  }
 
};




export const registerUser =
  async(avatar,name,email,password)=> {

    try {
      store.dispatch(RegisterRequest());

      const { data } = await axios.post(
        `${URL}/api/v1/register`,
        {avatar, name,email, password},
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      localStorage.setItem("token", data.token);

      store.dispatch(RegisterSuccess(data.user))
    } catch (error) {
      console.log(error);
  
      store.dispatch(RegisterFailure(error.response.data.message));
    }
    
  };





export const updateProfile = async(name, email, avatar) => {

  try {
    store.dispatch(updateProfileRequest());


    const { data } = await axios.put(
      `${URL}/api/v1/update/profile`,
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
      }
    );

    store.dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    store.dispatch(updateProfileFailure(error.response.data.message))
  }
};

export const updatePassword =
  async(oldPassword, newPassword) => {
    

    try {
      store.dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${URL}/api/v1/update/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
          },
        }
      );

      store.dispatch(updatePasswordSuccess(data.message));
      
    } catch (error) {
      store.dispatch(updatePasswordFailure(error.response.data.message));
    }
  };




export const deleteMyProfile = async() => {


  try {
   store.dispatch(deleteProfileRequest());
    

    const { data } = await axios.delete(`${URL}/api/v1/delete/me`, 
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });

    store.dispatch(deleteProfileSuccess(data.message));
  } catch (error) {
    store.dispatch(deleteProfileFailure(error.response.data.message))
  }
};

export const forgotPassword = async(email)=> {

  try {
    store.dispatch(forgotPasswordRequest());

    const { data } = await axios.post(
      `${URL}/api/v1/forgot/password`,
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    store.dispatch(forgotPasswordSuccess(data.message))
  } catch (error) {
    store.dispatch(forgotPasswordFailure(error.response.data.message));
  }
};




export const resetPassword = async(token, password)=> {

  try {
   store.dispatch(resetPasswordRequest());
    

    const { data } = await axios.put(
      `${URL}/api/v1/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    store.dispatch(resetPasswordSuccess(data.message));

  } catch (error) {
    store.dispatch(resetPasswordFailure(error.response.data.message));
  }
  
};





export const getUserPosts = async(id)=> {

  try {
    store.dispatch(userPostsRequest());

    const { data } = await axios.get(`${URL}/api/v1/userposts/${id}`, 
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} })
    console.log(data);
    store.dispatch(userPostsSuccess(data.posts));  
  } catch (error) {
    store.dispatch(userPostsFailure(error.response.data.message));
  }
};





export const getUserProfile = async(id)=> {

  try {
    store.dispatch(userProfileRequest());
    

    const { data } = await axios.get(`${URL}/api/v1/user/${id}`,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
    store.dispatch(userProfileSuccess(data.user));
    
  } catch (error) {
    store.dispatch(userProfileFailure(error.response.data.message));

}
}





export const followAndUnfollowUser = async(id)=> {

  try {
    store.dispatch(followUserRequest());
    

    const { data } = await axios.get(`${URL}/api/v1/follow/${id}`,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} });
    store.dispatch(followUserSuccess(data.message));

  } catch (error) {
    store.dispatch(followUserFailure(error.response.data.message));
}
};


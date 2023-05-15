import express from "express";
import { register,login,
    followUser,
    logout,
    updatePassword,
    updateProfile,
    deleteMyProfile,
    myProfile,
    getUserProfile,
    getAllUsers,
    forgotPassword,
    resetPassword,
    getMyPosts,
    getUserPosts, } from "../controller/user-controller.js";

    import { createPost, likeAndUnlikePost,
        deletePost,
        getPostOfFollowing,
        updateCaption,
        } from "../controller/post-controller.js";

        import { commentOnPost, 
          replyOnComment,
           deleteComment, 
           deleteReply,
           likeAndUnlikeComment }from "../controller/comment-controller.js";


    import { isAuthenticated } from "../middleware/auth.js";

    const router=express.Router();

 

    router.post("/register" ,register);

router.post("/login",login);

router.get("/logout",logout);

router.get("/follow/:id",isAuthenticated, followUser);

router.put("/update/password",isAuthenticated, updatePassword);

router.put("/update/profile",isAuthenticated, updateProfile);

router.delete("/delete/me",isAuthenticated, deleteMyProfile);
router.get("/me",isAuthenticated, myProfile);

router.get("/my/posts",isAuthenticated, getMyPosts);

router.get("/userposts/:id",isAuthenticated, getUserPosts);

router.get("/user/:id",isAuthenticated, getUserProfile);

router.get("/users",isAuthenticated, getAllUsers);

router.post("/forgot/password",forgotPassword);

router.put("/password/reset/:token",resetPassword);





// //posts
// router.post("/post/upload",isAuthenticated, createPost);

// router
//   .get("/post/:id",isAuthenticated, likeAndUnlikePost)
//   .put("/post/:id",isAuthenticated, updateCaption)
//   .delete("/post/:id",isAuthenticated, deletePost);

// router.get("/posts",isAuthenticated, getPostOfFollowing);

// router.put("/post/comment/:id",isAuthenticated, commentOnPost)
//  router.delete("/post/comment/:id",isAuthenticated, deleteComment);
//  router.get("/post/comment/:id",isAuthenticated, likeAndUnlikeComment);

//  router.put("/replyOnComment/:id",isAuthenticated, replyOnComment )
//  router.delete("/replyOnComment/:id",isAuthenticated, deleteReply);
//  router.get("/likeComment/:id",isAuthenticated, likeAndUnlikeComment)



export default router;
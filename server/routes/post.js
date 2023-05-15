import  express  from "express";
import { createPost, 
    likeAndUnlikePost,
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



router.post("/post/upload",isAuthenticated, createPost);

router
  .get("/post/:id",isAuthenticated, likeAndUnlikePost)
  .put("/post/:id",isAuthenticated, updateCaption)
  .delete("/post/:id",isAuthenticated, deletePost);

router.get("/posts",isAuthenticated, getPostOfFollowing);

router
  .put("/post/comment/:id",isAuthenticated, commentOnPost)
  .delete("/post/comment/:id",isAuthenticated, deleteComment);

  router.put("/post/comment/:id",isAuthenticated, commentOnPost)
 router.delete("/post/comment/:id",isAuthenticated, deleteComment);
 router.get("/post/comment/:id",isAuthenticated, likeAndUnlikeComment);

 router.put("/replyOnComment/:id",isAuthenticated, replyOnComment )
 router.delete("/replyOnComment/:id",isAuthenticated, deleteReply);
 router.get("/likeComment/:id",isAuthenticated, likeAndUnlikeComment)



export default router;
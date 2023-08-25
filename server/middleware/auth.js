import jwt from "jsonwebtoken";

import User from "../models/user-schema.js";


export const isAuthenticated  = async (req, res, next) => {
  try {

      const { authorization } = await req.headers;
     console.log(authorization);

 
    if (!authorization) {
      console.log('yes')
      return res.status(401).json({
        message: "Please login first",
      });
    }   
    const token = authorization.replace("Bearer ","")
    // console.log(token)

    const decoded = await jwt.verify(token, "abacabc456^%$");

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

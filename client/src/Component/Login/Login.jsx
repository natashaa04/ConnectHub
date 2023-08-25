import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import { removeUserError } from "../../Reducers/User";
import { removeLikeMessage } from "../../Reducers/Post";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    loginUser(email, password);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(removeUserError());
      
    }
    if (message) {
      alert.success(message);
      dispatch(removeLikeMessage());
    
    }
  }, [alert, error, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          ConnectHub
        </Typography>

        <div className="inputContainer">
          <Typography variant="h6">Email</Typography>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <Typography variant="h6">Password</Typography>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot/password" className="forgotPasswordLink">
            <Typography variant="subtitle1">Forgot Password?</Typography>
          </Link>
        </div>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography variant="subtitle1">New User? Register</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;

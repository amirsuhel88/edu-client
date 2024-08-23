import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setError, setToken } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

import userSlice from "../redux/userSlice";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setContfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post("http://localhost:3000/api/v2/signup", {
        name,
        email,
        password,
        phone,
        role,
      });
      dispatch(setToken(response.data.token));
      dispatch(setStatus("Succeeded"));
      navigate("/login");
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setStatus("failed"));
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* <label htmlFor="confirmPassword">confirm Password:</label>
        <input
          type="confirmPassword"
          id="phonconfirmPassworde"
          value={confirmPassword}
          onChange={(e) => setPhone(e.target.value)}
          required
        /> */}

        <label htmlFor="role">Role:</label>
        <input
          type="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">
          {status === "loading" ? "Logging in..." : "SignUp"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

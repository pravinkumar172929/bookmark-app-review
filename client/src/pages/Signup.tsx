import React, { useState } from "react";

export const Signup = () => {
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupValues.password !== signupValues.confirmPassword) {
      console.log("Passwords do not match");
    } else {
      console.log("Ready to signup");
    }
  };

  //   console.log("signupValues => ", signupValues);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={signupValues.email}
          name="email"
          onChange={signupHandler}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupValues.password}
          name="password"
          onChange={signupHandler}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={signupValues.confirmPassword}
          name="confirmPassword"
          onChange={signupHandler}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

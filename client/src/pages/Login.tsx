import React, { useState } from "react";

const Login = () => {
  const [signinValues, setSigninValues] = useState({ email: "", password: "" });

  const signinHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSigninValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signinValues);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={signinHandler}
          value={signinValues.email}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={signinHandler}
          value={signinValues.password}
          name="password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

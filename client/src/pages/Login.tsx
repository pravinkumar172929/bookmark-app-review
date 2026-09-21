import React, { useState } from "react";

const Login = () => {
  const [signinValues, setSigninValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const signinHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    setSigninValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signinValues);

    const signinData = {
      email: signinValues.email,
      password: signinValues.password,
    };

    try {
      setError("");
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      const data = await response.json();
      console.log("data => ", data);

      if (!response.ok) {
        setError(data);
        return;
      }
    } catch (error) {
      console.log("signup error:", error);
      setError("Something went wrong!");
    }
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
        {error && <p>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

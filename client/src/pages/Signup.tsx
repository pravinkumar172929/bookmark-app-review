import React, { useState } from "react";

export const Signup = () => {
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const signupHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError("");
    setSignupValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupValues.password !== signupValues.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const signupData = {
      email: signupValues.email,
      password: signupValues.password,
    };

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      console.log("signup successful: ", data);
    } catch (error) {
      console.log("signup error:", error);
      setError("Something went wrong!");
    } finally {
      console.log("signup request completed");
    }
  };

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
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

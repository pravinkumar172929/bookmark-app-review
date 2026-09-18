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

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupValues.password !== signupValues.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Ready to signup");

    const signupData = {
      email: signupValues.email,
      password: signupValues.password,
    };

    fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then(async (response) => {
        const data = await response.json();

        return {
          ok: response.ok,
          status: response.status,
          data,
        };
      })
      .then((result) => {
        console.log(result);

        if (!result.ok) {
          setError(result.data);
          return;
        }

        console.log("sigup Response => ", result.data);
      });
    //   .then((data) => {
    //     console.log("sigup Response => ", data);
    //   });
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

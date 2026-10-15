import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { Input } from "../components/ui/Input/Input";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const signinData = {
      email: email,
      password: password,
    };

    try {
      setError("");
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      navigate("/bookmarks");
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />

        {error && <p>{error}</p>}

        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>

      <Link to="/signup">Create an account</Link>
    </>
  );
};

export default Login;

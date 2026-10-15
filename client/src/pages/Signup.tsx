import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input/Input";
import { Button } from "../components/ui/Button/Button";
import styles from "../styles/auth-form.module.css";

export const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const signupData = {
      email: email,
      password: password,
    };

    try {
      setError("");
      setLoading(true);
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

      navigate("/");
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
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
        <Input
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {error && <p>{error}</p>}

        <Button type="submit" loading={loading}>
          Sign Up
        </Button>
      </form>

      <Link to="/" className={styles.footer}>
        Already have an account
      </Link>
    </>
  );
};

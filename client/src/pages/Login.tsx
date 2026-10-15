import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";
import { Input } from "../components/ui/Input/Input";

const Login = () => {
  const navigate = useNavigate();

  const [signinValues, setSigninValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    const signinData = {
      email: signinValues.email,
      password: signinValues.password,
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
        <button type="submit" disabled={loading}>
          {loading ? "Siginng In" : "Sign In"}
        </button>
      </form>

      <Link to="/signup">Create an account</Link>
      <Button onClick={() => alert("hi")}>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button disabled={false}>Enabled</Button>

      <Button variant="primary">Add Bookmark</Button>

      <Button variant="secondary">Cancel</Button>

      <Button loading={false}>Add Bookmark</Button>

      <Button loading={true}>Add Bookmark</Button>
      <Button loading>Save Changes</Button>

      <Input />
    </>
  );
};

export default Login;

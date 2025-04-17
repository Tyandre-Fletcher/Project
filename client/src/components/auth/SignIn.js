import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_URL = "http://localhost:5000/api";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const userResponse = await fetch(`${API_URL}/auth/user`, {
        headers: {
          "x-auth-token": data.token,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        updateUser(userData);

        navigate("/dashboard");
      } else {
        throw new Error("Failed to load user data");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="auth-redirect">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;

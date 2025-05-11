import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Email or phone
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Forgot Password Handler
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/donors/forgot-password?email=" + identifier, {
        method: "POST"
      });

      const data = await response.text();
      setMessage(data);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Login Handler (supports email or phone)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    setLoading(true);

    try {
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, phone: "", password }
        : { email: "", phone: identifier, password };

      const response = await fetch("http://localhost:8080/donors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.text();
      if (response.ok) {
        navigate("/dashboard"); // ✅ Redirect without alert
      } else {
        setMessage(data);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-container">
      {showForgotPassword ? (
        <div id="forgot-password-container">
          <h2>Forgot Password</h2>
          <form id="forgot-password-form" onSubmit={handleForgotPasswordSubmit}>
            <label htmlFor="identifier-input">
              Enter your email:
              <input
                id="identifier-input"
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </label>
            <br /><br />
            <button id="submit-btn" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </button>
          </form>
          {message && <p id="message">{message}</p>}
          <p>
            <a href="#" onClick={() => setShowForgotPassword(false)}>Back to Login</a>
          </p>
        </div>
      ) : (
        <div id="login-form-container">
          <h2>Login</h2>
          <form id="login-form" onSubmit={handleLoginSubmit}>
            <label htmlFor="login-identifier-input">
              Email or Phone:
              <input
                id="login-identifier-input"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </label>
            <br /><br />
            <label htmlFor="login-password-input">
              Password:
              <input
                id="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br /><br />
            <button id="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {message && <p id="error-message">{message}</p>}
          <div className="button-group">
            <a href="#" onClick={() => setShowForgotPassword(true)} className="auth-link">
              Forgot Password?
            </a>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/register")} className="auth-link">
                Register
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token");
    }
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Processing...");

    try {
      const response = await fetch(`http://localhost:8080/donors/reset-password?token=${token}&newPassword=${newPassword}`, {
        method: "POST",
      });

      const data = await response.text();
      setMessage(data);

      if (response.ok) {
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;

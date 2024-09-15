import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';
import './ConfirmAccount.css';

function ConfirmAccount({ onLogin }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email and password from previous state
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || '');
      setPassword(location.state.password || '');
    }
  }, [location]);

  const handleConfirm = async () => {
    if (!confirmationCode || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/confirm`, {
        email,
        confirmationCode,
        password,
      });

      // Check the correct structure of response.data
      if (response.data && response.data.idToken && response.data.accessToken && response.data.refreshToken) {
        const { idToken, accessToken, refreshToken } = response.data;
        setMessage("Account confirmed and logged in successfully!");

        // Call onLogin with all tokens
        onLogin(idToken, accessToken, refreshToken);

        // Redirect to the admin dashboard or home page
        navigate("/dashboard");
      } else {
        setMessage("No valid tokens received from the backend.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Account confirmation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage("Please enter your email to resend confirmation.");
      return;
    }

    setResendLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/resend-confirmation`, {
        email,
      });
      setMessage("Confirmation email resent. Please check your inbox.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend confirmation.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="confirm-container">
      <div className="confirm-box">
        <h2>Confirm Your Account</h2>
        <input
          type="text"
          placeholder="Enter confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="input-field"
        />
        <Button
          text={loading ? "..." : "Confirm"}
          onClick={handleConfirm}
          styleType="default"
          className="confirm-button"
        />
        <p className="message">{message}</p>
        {/* Resend Confirmation Email */}
        <div className="message-container">
          <p>Didn't receive the email?</p>
          <a href="#" onClick={(e) => { 
              e.preventDefault(); // Prevent the default anchor behavior
              handleResendConfirmation(); 
            }}>
            {resendLoading ? "Resending..." : "Resend Confirmation Email"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAccount;

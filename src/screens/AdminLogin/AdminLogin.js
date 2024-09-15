import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {
        email,
        password,
      });

      if (response.data.challengeName === "NEW_PASSWORD_REQUIRED") {
        setSession(response.data.session);
        setMessage("Please enter a new password and your information.");
      } else if (response.data.idToken) {
        const { idToken, accessToken, refreshToken } = response.data;
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        onLogin(idToken);
        navigate("/"); // Navigate to the admin dashboard or home page
      } else {
        setMessage("Login failed: no data in response");
      }
    } catch (error) {
      // Check if the user is not confirmed
      if (error.response?.data?.error === "UserNotConfirmedException") {
        setMessage("Please confirm your account first.");
        navigate("/confirm", { state: { email, password } });
      } else {
        setMessage(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async () => {
    if (!newPassword || !firstName || !lastName || !phoneNumber || !session) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/set-new-password`, {
        email,
        newPassword,
        session,
        phone_number: phoneNumber,
        given_name: firstName,
        family_name: lastName,
      });

      if (response.data.idToken) {
        const { idToken, accessToken, refreshToken } = response.data;
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        onLogin(idToken);
        navigate("/"); // Navigate to the admin dashboard or home page
      } else {
        setMessage("Failed to set new password.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to set new password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <div className="input-container">
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            disabled={session !== null}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            disabled={session !== null}
          />
          {session && (
            <>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field"
              />
            </>
          )}
        </div>
        <Button
          text={loading ? "Processing..." : session ? "Confirm" : "Login"}
          onClick={() => {
            if (session) {
              handleNewPasswordSubmit();
            } else {
              handleLogin();
            }
          }}
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

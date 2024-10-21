import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import icon from "../../assets/icons/icon.png";
import line from "../../assets/images/line.png"; // Adjust the path if necessary

function Navbar({ isAuthenticated, handleLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // Reference to the button

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the document
    setIsExpanded((prev) => !prev); // Toggle the dropdown state
  };

  const handleItemClick = (path) => {
    setIsExpanded(false); // Collapse the navbar when an item is clicked
    navigate(path); // Navigate to the clicked path
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsExpanded(false); // Close dropdown if clicked outside and not on the button
    }
  };

  // Function to refresh tokens
  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch (err) {
      console.error("Failed to refresh tokens:", err);
      return false;
    }
  };

  // Function to handle logout
  const handleLogoutClick = () => {
    handleLogout(); // Assuming this function clears tokens and authentication state
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let idToken = localStorage.getItem("idToken");
      if (!idToken) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/adminProfile/admin-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          const tokenRefreshed = await refreshTokens();
          if (tokenRefreshed) {
            // Retry fetching user data with the new token
            idToken = localStorage.getItem("idToken");
            const retryResponse = await fetch(
              `${process.env.REACT_APP_API_URL}/adminProfile/admin-profile`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${idToken}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (!retryResponse.ok) {
              throw new Error("Failed to fetch user data after token refresh");
            }

            const data = await retryResponse.json();
            setUserData(data);
          } else {
            handleLogoutClick();
          }
        } else if (!response.ok) {
          throw new Error("Failed to fetch user data");
        } else {
          const data = await response.json();
          setUserData(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthenticated, navigate]); // Added 'navigate' to the dependency array

  return (
    <>
      <nav className={`navbar ${isExpanded ? "expanded" : ""}`}>
        <div className="navbar-container">
          <div className="nav-left">
            <div className="nav-item" onClick={() => navigate("/")}>
              ZEAL
            </div>
          </div>
          <div className="nav-center">
            <img
              src={icon}
              alt="Icon"
              className="nav-icon"
              onClick={toggleDropdown}
              ref={buttonRef} // Attach the reference to the button
              style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
            />
          </div>
          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <div className="nav-item" onClick={() => navigate("/profile")}>
                  {userData ? userData.first_name : "Loading..."}
                </div>
              </>
            ) : (
              <>
                <div className="nav-item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="nav-item">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {isExpanded && (
        <div
          className="dropdown-overlay"
          ref={dropdownRef}
          onClick={() => setIsExpanded(false)} // Close dropdown if overlay is clicked
        >
          <div
            className="expanded-menu"
            onClick={(e) => e.stopPropagation()} // Prevent the dropdown from closing when clicking inside
          >
            <div className="line">
              <img src={line} alt="Line" className="line-img" />
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleItemClick("/about")}
            >
              ABOUT US
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleItemClick("/manage-stadium")}
            >
              ADD STADIUM
            </div>
            {isAuthenticated && (
              <>
                <div
                  className="dropdown-item"
                  onClick={() => handleItemClick("/create-game")}
                >
                  CREATE GAME
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => handleItemClick("/profile")}
                >
                  PROFILE
                </div>
                <div className="dropdown-item" onClick={handleLogoutClick}>
                  LOG OUT
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const idToken = localStorage.getItem('idToken');
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      {users.map(user => (
        <div key={user._id}>
          <p>{user.first_name} {user.last_name}</p>
          {/* Add buttons for Edit and Delete */}
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;

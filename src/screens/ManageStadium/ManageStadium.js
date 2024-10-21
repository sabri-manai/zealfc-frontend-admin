// ManageStadium/ManageStadium.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStadium.css';
import Button from "../../components/Button/Button"; // Adjust the path if necessary

function ManageStadium() {
  const [stadiumData, setStadiumData] = useState({
    name: '',
    address: '',
    capacity: '',
    manager: '',
    phone: '',
    email: '',
    hosts: [],
    price: '',
    slotsInput: '',
    amenities: [],
    type: '',
    surface: '',
  });

  const [availableHosts, setAvailableHosts] = useState([]);
  const [availableAmenities] = useState([
    'Restrooms',
    'Locker Rooms',
    'Parking',
    // Add more amenities as needed
  ]);
  const [availableTypes] = useState(['Indoor', 'Outdoor']);
  const [availableSurfaces] = useState(['Grass', 'Artificial Turf']);

  useEffect(() => {
    // Fetch hosts from the backend
    async function fetchHosts() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hosts`);
        setAvailableHosts(response.data);
      } catch (error) {
        console.error('Error fetching hosts:', error);
      }
    }
    fetchHosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStadiumData({
      ...stadiumData,
      [name]: value,
    });
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    let updatedAmenities = [...stadiumData.amenities];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      updatedAmenities = updatedAmenities.filter((item) => item !== value);
    }
    setStadiumData({ ...stadiumData, amenities: updatedAmenities });
  };

  const handleHostsChange = (e) => {
    const selectedHosts = Array.from(e.target.selectedOptions, (option) => option.value);
    setStadiumData({ ...stadiumData, hosts: selectedHosts });
  };

  const handleSlotsChange = (e) => {
    const { value } = e.target;
    setStadiumData({ ...stadiumData, slotsInput: value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const slotsArray = stadiumData.slotsInput
      .split(',')
      .map((dateStr) => new Date(dateStr.trim()))
      .filter((date) => !isNaN(date));
  
    const dataToSubmit = {
      ...stadiumData,
      capacity: parseInt(stadiumData.capacity, 10),
      price: parseFloat(stadiumData.price),
      slots: slotsArray,
    };
  
    delete dataToSubmit.slotsInput;
  
    try {
      // Include the idToken in the request headers
      const idToken = localStorage.getItem('idToken');
      if (!idToken) {
        alert('You must be logged in to perform this action.');
        return;
      }
  
      await axios.post(
        `${process.env.REACT_APP_API_URL}/stadiums/create`,
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      alert('Stadium created successfully!');
      // Reset form
      setStadiumData({
        name: '',
        address: '',
        capacity: '',
        manager: '',
        phone: '',
        email: '',
        hosts: [],
        price: '',
        slotsInput: '',
        amenities: [],
        type: '',
        surface: '',
      });
    } catch (error) {
      console.error('Error creating stadium:', error);
      alert('Failed to create stadium. Please try again.');
    }
  };
  

  return (
    <div className="manage-stadium-container">
      <h2>Add New Stadium</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={stadiumData.name} onChange={handleChange} required />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={stadiumData.address} onChange={handleChange} required />
        </div>

        {/* Capacity */}
        <div className="form-group">
          <label>Capacity:</label>
          <input type="number" name="capacity" value={stadiumData.capacity} onChange={handleChange} required />
        </div>

        {/* Manager */}
        <div className="form-group">
          <label>Manager:</label>
          <input type="text" name="manager" value={stadiumData.manager} onChange={handleChange} required />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={stadiumData.phone} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={stadiumData.email} onChange={handleChange} />
        </div>

        {/* Hosts */}
        <div className="form-group">
          <label>Hosts:</label>
          <select name="hosts" multiple value={stadiumData.hosts} onChange={handleHostsChange}>
            {availableHosts.map((host) => (
              <option key={host._id} value={host._id}>
                {host.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={stadiumData.price} onChange={handleChange} />
        </div>

        {/* Slots */}
        <div className="form-group">
          <label>Slots (comma-separated dates):</label>
          <input type="text" name="slotsInput" value={stadiumData.slotsInput} onChange={handleSlotsChange} />
        </div>

        {/* Amenities */}
        <fieldset className="form-group">
          <legend>Amenities:</legend>
          {availableAmenities.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={stadiumData.amenities.includes(amenity)}
                onChange={handleAmenitiesChange}
              />
              {amenity}
            </label>
          ))}
        </fieldset>

        {/* Type */}
        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={stadiumData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Surface */}
        <div className="form-group">
          <label>Surface:</label>
          <select name="surface" value={stadiumData.surface} onChange={handleChange}>
            <option value="">Select Surface</option>
            {availableSurfaces.map((surface) => (
              <option key={surface} value={surface}>
                {surface}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button text="Add Stadium" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default ManageStadium;

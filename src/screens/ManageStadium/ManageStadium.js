import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStadium.css';
import Button from "../../components/Button/Button";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useNavigate } from 'react-router-dom';

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
    slots: [],
    amenities: [],
    type: '',
    surface: '',
  });

  const [slotInput, setSlotInput] = useState({
    dayOfWeek: 'Monday',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    available: true,
    price: '',
  });
  const [step, setStep] = useState(1);
  const [availableHosts, setAvailableHosts] = useState([]);
  const [availableAmenities] = useState(['Restrooms', 'Locker Rooms', 'Parking']);
  const [availableTypes] = useState(['Indoor', 'Outdoor']);
  const [availableSurfaces] = useState(['Grass', 'Artificial Turf']);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const navigate = useNavigate();  // Use navigate to redirect

  useEffect(() => {
    async function fetchHosts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/hosts`);
            setAvailableHosts(response.data);
        } catch (error) {
            console.error('Error fetching hosts:', error);
        }
    }
    fetchHosts();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStadiumData({ ...stadiumData, [name]: value });
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setSlotInput({ ...slotInput, [name]: value });
  };

  const handleAddSlot = () => {
    const { dayOfWeek, startTime, endTime, startDate, endDate, available, price } = slotInput;
    if (dayOfWeek && startTime && endTime && startDate && endDate) {
      setStadiumData((prevData) => ({
        ...prevData,
        slots: [...prevData.slots, { dayOfWeek, startTime, endTime, startDate, endDate, available, price: parseFloat(price) || stadiumData.price }],
      }));
      setSlotInput({ dayOfWeek: 'Monday', startTime: '', endTime: '', startDate: '', endDate: '', available: true, price: '' });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting stadium data:', stadiumData);

    // Retrieve and validate the idToken
    const idToken = localStorage.getItem('idToken');

    if (!idToken) {
        alert('You must be logged in to perform this action.');
        return;
    }

    // Prepare data with correctly formatted fields
    const dataToSubmit = {
        ...stadiumData,
        capacity: stadiumData.capacity ? parseInt(stadiumData.capacity, 10) : 0, // Convert capacity to number, default to 0
        price: stadiumData.price ? parseFloat(stadiumData.price) : 0, // Convert price to number, default to 0 if empty
        slots: stadiumData.slots.map(slot => ({
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            startDate: slot.startDate,
            endDate: slot.endDate,
            available: slot.available,
            price: slot.price ? parseFloat(slot.price) : 0, // Convert slot-specific price to number, default to 0 if empty
        }))
    };

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/stadiums/create`,
            dataToSubmit,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`, // Set Authorization header
                    'Content-Type': 'application/json' // Ensure JSON format is sent
                },
            }
        );

        console.log('Server response:', response);
        alert('Stadium created successfully!');

        // Reset form fields
        setStadiumData({
            name: '', address: '', capacity: '', manager: '', phone: '', email: '',
            hosts: [], price: '', slots: [], amenities: [], type: '', surface: '',
        });
        setStep(1);
        // Redirect to dashboard after success
        navigate("/dashboard");
    } catch (error) {
        console.error('Error creating stadium:', error);

        // Check if the error response contains useful information
        if (error.response && error.response.data) {
            console.error('Error details:', error.response.data);
            alert(`Failed to create stadium: ${error.response.data.message || 'Please check the data and try again.'}`);
        } else {
            alert('Failed to create stadium. Please try again.');
        }
    }
};


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>Name of The Pitch:</label>
              <input type="text" name="name" value={stadiumData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" name="address" value={stadiumData.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input type="number" name="capacity" value={stadiumData.capacity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Manager:</label>
              <input type="text" name="manager" value={stadiumData.manager} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={stadiumData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={stadiumData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hosts:</label>
              <fieldset className="host-list">
                {availableHosts.length > 0 ? (
                  availableHosts.map((host) => (
                    <label key={host._id} className="host-item">
                      <input
                        type="checkbox"
                        name="hosts"
                        value={host._id}
                        checked={stadiumData.hosts.includes(host._id)}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          setStadiumData((prevData) => ({
                            ...prevData,
                            hosts: checked
                              ? [...prevData.hosts, value]
                              : prevData.hosts.filter((id) => id !== value),
                          }));
                        }}
                      />
                      {`${host.first_name} ${host.last_name}`}
                    </label>
                  ))
                ) : (
                  <p>No hosts available.</p>
                )}
              </fieldset>
            </div>
          </>
        );
        case 2:
          return (
            <>
              <div className="form-group">
                <label>Day of the Week:</label>
                <select name="dayOfWeek" value={slotInput.dayOfWeek} onChange={handleSlotChange}>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Start Time:</label>
                <input type="time" name="startTime" value={slotInput.startTime} onChange={handleSlotChange} required />
              </div>
              <div className="form-group">
                <label>End Time:</label>
                <input type="time" name="endTime" value={slotInput.endTime} onChange={handleSlotChange} required />
              </div>
              <div className="form-group">
                <label>Slot Price:</label>
                <input type="number" name="price" value={slotInput.price} onChange={handleSlotChange} placeholder="Enter slot-specific price" />
              </div>
              <div className="form-group">
                <label>Start Date:</label>
                <Datetime dateFormat="YYYY-MM-DD" timeFormat={false} value={slotInput.startDate} onChange={(date) => setSlotInput({ ...slotInput, startDate: date.format("YYYY-MM-DD") })} />
              </div>
              <div className="form-group">
                <label>End Date:</label>
                <Datetime dateFormat="YYYY-MM-DD" timeFormat={false} value={slotInput.endDate} onChange={(date) => setSlotInput({ ...slotInput, endDate: date.format("YYYY-MM-DD") })} />
              </div>
              <Button text="Add Slot" onClick={handleAddSlot} />
              <div className="form-group">
                <h3>Added Slots:</h3>
                <ul>
                  {stadiumData.slots.map((slot, index) => (
                    <li key={index}>{`${slot.dayOfWeek} ${slot.startTime} - ${slot.endTime} (${slot.startDate} to ${slot.endDate}) - ${slot.available ? 'Available' : 'Unavailable'} - Price: ${slot.price}`}</li>
                  ))}
                </ul>
              </div>
            </>
          );
        case 3:
          return (
            <>
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
              <div className="form-group">
                <label>Type:</label>
                <select name="type" value={stadiumData.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  {availableTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Surface:</label>
                <select name="surface" value={stadiumData.surface} onChange={handleChange}>
                  <option value="">Select Surface</option>
                  {availableSurfaces.map((surface) => (
                    <option key={surface} value={surface}>{surface}</option>
                  ))}
                </select>
              </div>
            </>
          );
        default:
          return null;
      }
    };

  return (
    <div className="manage-stadium-container">
      <h2>Add New Stadium</h2>
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        <div className="form-navigation">
          {step > 1 && <Button text="Back" onClick={() => setStep(step - 1)} />}
          {step < 3 && <Button text="Next" onClick={() => setStep(step + 1)} />}
          {step === 3 && <Button text="Add Stadium" type="submit" />}
        </div>
      </form>
    </div>
  );
}

export default ManageStadium;

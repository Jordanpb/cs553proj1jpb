import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [carData, setCarData] = useState({
    vin: '',
    plateNumber: '',
    state: '',
    make: '',
    model: '',
    year: 0,
    ownerName: '',
    ownerAddress: '',
    dlNumber: '',
    problemDescription: '',
    timeInShop: 0,
    workers: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/cars', carData);
      alert('Car data submitted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;

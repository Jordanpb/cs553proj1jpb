import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://backend:3000/cars');
        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log("running fetch cars")
    fetchCars();
  }, []);

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>{car.make} - {car.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;

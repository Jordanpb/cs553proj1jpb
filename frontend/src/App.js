import React from 'react';
import CarForm from './components/CarForm';
import CarList from './components/CarList';

function App() {
  return (
    <div>
      <h1>Car Management System</h1>
      <CarForm />
      <CarList />
    </div>
  );
}

export default App;

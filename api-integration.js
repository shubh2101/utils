// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchSomeData = async () => {
  try {
    const response = await apiService.get('/someEndpoint');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can define more API functions here for different endpoints

//mycomponent
import React, { useState, useEffect } from 'react';
import { fetchSomeData } from './apiService'; // Import your API functions

function MyComponent() {
  const [data, setData] = useState(null);

  // Fetch data when the component mounts
  async function fetchData() {
    try {
      const result = await fetchSomeData();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // useEffect block
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          {/* Render the fetched data */}
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;

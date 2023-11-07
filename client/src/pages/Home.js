import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const [breweries, setBreweries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCities();
  }, [selectedCity, selectedType]);

  const calculateAverageRating = (breweryId) => {
    const breweryReviews = reviews.filter((review) => review.breweryId === breweryId);
    if (breweryReviews.length === 0) {
      return "No Rating Yet";
    }
    const totalRating = breweryReviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / breweryReviews.length;
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://api.openbrewerydb.org/v1/breweries');
      const uniqueCities = [...new Set(response.data.map((brewery) => brewery.city))];
      setCities(uniqueCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchData = async () => {
    let apiUrl = 'https://api.openbrewerydb.org/v1/breweries';

    const queryParameters = [];
    if (selectedCity) {
      queryParameters.push(`by_city=${selectedCity}`);
    }
    if (searchTerm) {
      queryParameters.push(`by_name=${searchTerm}`);
    }
    if (selectedType) {
      queryParameters.push(`by_type=${selectedType}`);
    }

    if (queryParameters.length > 0) {
      apiUrl += `?${queryParameters.join('&')}`;
    }

    try {
      const response = await axios.get(apiUrl);
      setBreweries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    fetchData(); 
    setSearchTerm(''); 
    setSelectedCity(''); 
    setSelectedType(''); 
  };

  return (
    <div className="homepage-container">
      <h1>Breweries</h1>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-button"
          onClick={handleSearch} 
        >
          Search
        </button>
      </div>

      <div className="dropdown-container">
        <label className="dropdown-label">City</label>
        <select
          className="dropdown-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label className="dropdown-label">Brewery Type</label>
        <select
          className="dropdown-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="micro">Micro</option>
          <option value="nano">Nano</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large</option>
          <option value="planning">Planning</option>
          <option value="bar">Bar</option>
          <option value="contract">Contract</option>
          <option value="proprietor">Proprietor</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <h3>
              <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
            </h3>
            <p className="brewery-info">Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
            <p className="brewery-info">Phone: {brewery.phone}</p>
            <p className="brewery-info">Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <p className="brewery-info">Rating: {calculateAverageRating(brewery.id)}</p>
            <p className="brewery-info">City, State: {brewery.city}, {brewery.state_province}</p>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default HomePage;

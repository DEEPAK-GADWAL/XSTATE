import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetchCities(selectedCountry, selectedState);
    }
  }, [selectedCountry, selectedState]);

  const fetchData = async (url, errorMessage, setData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(errorMessage, error);
      setError(`${errorMessage} Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = () =>
    fetchData(
      "https://crio-location-selector.onrender.com/countries",
      "Error fetching countries.",
      setCountries
    );

  const fetchStates = (country) =>
    fetchData(
      `https://crio-location-selector.onrender.com/country=${country}/states`,
      "Error fetching states.",
      setStates
    );

  const fetchCities = (country, state) =>
    fetchData(
      `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`,
      "Error fetching cities.",
      setCities
    );

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {error && (
        <div
          data-testid="error-message"
          style={{ color: "red", marginBottom: "10px" }}
        >
          {error}
        </div>
      )}
      {loading && <div data-testid="loading-message">Loading...</div>}

      <select
        data-testid="country-select"
        value={selectedCountry}
        onChange={handleCountryChange}
        style={selectStyle}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        data-testid="state-select"
        value={selectedState}
        onChange={handleStateChange}
        disabled={!selectedCountry}
        style={selectStyle}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        data-testid="city-select"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!selectedState}
        style={selectStyle}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && (
        <div
          data-testid="selected-location"
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <p style={{ margin: "0 5px 0 0", fontWeight: "bold" }}>
            You selected
          </p>
          <h1 style={{ margin: "0 5px", fontWeight: "bold" }}>
            {selectedCity}
          </h1>
          <h3
            style={{
              margin: "0 0 0 5px",
              fontWeight: "lighter",
              color: "grey",
            }}
          >
            {selectedState}, {selectedCountry}
          </h3>
        </div>
      )}
    </div>
  );
};

const selectStyle = {
  width: "200px",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "4px",
  backgroundColor: "white",
  cursor: "pointer",
};

export default LocationSelector;

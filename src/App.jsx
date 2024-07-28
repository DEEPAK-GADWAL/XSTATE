import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

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
      <select
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

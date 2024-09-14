import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const countryData = data.map((country) => ({
          name: country.name.common,
          capital: country.capital && country.capital[0] ? country.capital[0] : 'No capital',
        }));
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : countries.filter(
          (country) =>
            country.name.toLowerCase().includes(inputValue) ||
            country.capital.toLowerCase().includes(inputValue)
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      <strong>{suggestion.name}</strong> - {suggestion.capital}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: 'Search for a country or capital...',
    value,
    onChange: onChange,
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
    }}>
      <h2>Country and Capital Search</h2>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default App;

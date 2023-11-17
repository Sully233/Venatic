import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { observer } from 'mobx-react';
import {addressStore} from "../../stores/AddressStore"

/*global google*/

const searchOptions = {
  componentRestrictions: { country: 'au' },

};




const MyPlacesAutocompletePage = () => {
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (value) => {
    setAddress(value);
  };


  const fetchEligibility = async (postcode) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/location/?address=${postcode}`);
        if (response.ok) {
          const data = await response.json();
          addressStore.setPostcodeEligible(data.eligibility)
        } else {
          console.error('API call failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    
  };


  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then(results => {
        const geocodeResult = results[0];

        const fullAddress = geocodeResult.formatted_address;

        setAddress(fullAddress);
        addressStore.setAddress(fullAddress);

        console.log('Full Address:', fullAddress);
  
        // Extracting the zip code
        const addressComponents = geocodeResult.address_components;
        const zipCodeComponent = addressComponents.find(component =>
          component.types.includes('postal_code')
        );

        const zipCode = zipCodeComponent ? zipCodeComponent.long_name : '';
        console.log('Zip Code:', zipCode);

        fetchEligibility(zipCode)
        
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        shouldFetchSuggestions={address.length > 3}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <input
              {...getInputProps({
                placeholder: 'Enter an address...',
                className: 'w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              })}
            />
            <div
              className={`autocomplete-dropdown-container absolute z-10 w-full bg-white shadow-lg mt-1 rounded-md ${
                loading || suggestions.length ? 'block' : 'hidden'
              }`}
            >
              {loading && <div className="p-4 text-gray-700">Loading...</div>}
              { suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'p-4 cursor-pointer bg-indigo-100'
                : 'p-4 cursor-pointer hover:bg-indigo-50';
                            return (
                    <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    key={suggestion.placeId || suggestion.description} 
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {errorMessage && <div className="text-red-600 p-3">{errorMessage}</div>}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default observer(MyPlacesAutocompletePage);
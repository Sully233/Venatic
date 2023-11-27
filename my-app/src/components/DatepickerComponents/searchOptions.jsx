import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { observer } from 'mobx-react';
import {addressStore} from "../../stores/AddressStore"
import { FaCheck, FaTimes } from 'react-icons/fa';

/*global google*/

const searchOptions = {
  componentRestrictions: { country: 'au' },

};




const MyPlacesAutocompletePage = () => {
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEligible, setIsEligible] = useState(null); // null, true, or false


  const handleChange = (value) => {
    setAddress(value);
  };


  const fetchEligibility = async (postcode) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/location/?address=${postcode}`);
        if (response.ok) {
          const data = await response.json();
          addressStore.setPostcodeEligible(data.eligibility)

          if (data.eligibility === 'Eligible') {
            setIsEligible(true);
          } else if (data.eligibility === 'Not Eligible') {
            setIsEligible(false);
          }
          
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
    <div className=" p-4">
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
                className: 'w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm',
              })}
            />
            <div
              className={`autocomplete-dropdown-container absolute z-10 w-full bg-white shadow-lg mt-1 rounded-md text-sm ${
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
      {/* {isEligible !== null && (
        <div className="flex items-center justify-center p-4">
          {isEligible ? (
            <FaCheck className="text-green-500 text-xl" />
          ) : (
            <FaTimes className="text-red-500 text-xl" />
          )}
        </div>
      )} */}

    </div>
  );
};

export default observer(MyPlacesAutocompletePage);
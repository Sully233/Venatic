import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { observer } from "mobx-react";
import { formStore } from "../../stores/FormStore";

/*global google*/

const searchOptions = {
  componentRestrictions: { country: "au" },
};

const MyPlacesAutocompletePage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isEligible, setIsEligible] = useState(null); // null, true, or false

  const [address, setAddress] = useState(() => {
    return formStore.address;
  });

  const handleChange = (value) => {
    setAddress(value);
  };

  const fetchEligibility = async (postcode) => {
    if (postcode === "") {
      formStore.setPostcodeEligible("MorePreciseRequired");
      setIsEligible(false);
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/api/location/?address=${postcode}`
        );
        if (response.ok) {
          const data = await response.json();
          formStore.setPostcodeEligible(data.eligibility);

          if (data.eligibility === "Eligible") {
            setIsEligible(true);
          } else if (data.eligibility === "Not Eligible") {
            setIsEligible(false);
          }
        } else {
          console.error(
            "API call failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((results) => {
        const geocodeResult = results[0];

        const fullAddress = geocodeResult.formatted_address;

        setAddress(fullAddress);
        formStore.setAddress(fullAddress);

        // Extracting the zip code
        const addressComponents = geocodeResult.address_components;
        const zipCodeComponent = addressComponents.find((component) =>
          component.types.includes("postal_code")
        );

        const zipCode = zipCodeComponent ? zipCodeComponent.long_name : "";

        fetchEligibility(zipCode);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <div className="py-1">
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
                placeholder: "Enter an address...",
                className:
                  "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              })}
            />
            <div
              className={`autocomplete-dropdown-container absolute z-10 w-full bg-white shadow-lg mt-1 rounded-md text-sm ${
                loading || suggestions.length ? "block" : "hidden"
              }`}
            >
              {loading && <div className="p-4 text-gray-700">Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "p-4 cursor-pointer bg-indigo-100"
                  : "p-4 cursor-pointer hover:bg-indigo-50";
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
            {errorMessage && (
              <div className="text-red-600 p-3">{errorMessage}</div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default observer(MyPlacesAutocompletePage);

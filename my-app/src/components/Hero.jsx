import React from 'react';
import { Link } from 'react-router-dom';
import MyPlacesAutocompletePage from './DatepickerComponents/searchOptions';
import { observer } from 'mobx-react';
import { addressStore } from '../stores/AddressStore';
import MultiStepForm from './BookingComponents/MultiStepForm';

const Hero = observer(() => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            Perfect Portraits
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            for every
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
            season of life.
          </h3>
          <div className="mt-4 md:mt-8 text-lg md:text-xl">
            Feel the Magic of Each Moment, Forever.
          </div>
          <Link to="/booking" className="mt-4 md:mt-8">
          </Link>
          <div className="mt-4">
            <p>test mobx (eligibility checker)</p>
            <p>{addressStore.postcodeEligible}</p>
          </div>
        </div>
        <div className="order-last md:order-last flex justify-center md:justify-end">
        <div className="w-full md:min-w-[500px] md:w-1/2 bg-slate-50 rounded-xl">
          <MultiStepForm />
        </div>
      </div>
      </div>
    </div>
  );
});

export default Hero;

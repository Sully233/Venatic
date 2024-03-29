import { makeAutoObservable } from "mobx";

class FormStore {
  address = "";

  postcodeEligible = "NA";

  selectedSize = "small"; // Default size
  duration = 1; // Default duration

  availabilities = [];
  chosenAvailibility = null;

  datesLoaded = false;

  date = null;

  availabilityLoaded = true;

  price = 0;

  checkoutURL = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAddress(newAddress) {
    this.address = newAddress;
  }

  setPostcodeEligible(eligibility) {
    this.postcodeEligible = eligibility;
  }

  setSelectedSize(size) {
    this.selectedSize = size;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  setavailabilities(availability) {
    this.availabilities = availability;
  }

  setChosenAvailability(timeslot) {
    this.chosenAvailibility = timeslot;
  }

  setDatesLoaded(value) {
    this.datesLoaded = value;
  }

  setDate(newDate) {
    this.date = newDate;
  }

  setAvailabilityLoaded(value) {
    this.availabilityLoaded = value;
  }

  setPrice(value) {
    this.price = value;
  }

  setCheckoutURL(value) {
    this.checkoutURL = value;
  }
}



export const formStore = new FormStore();

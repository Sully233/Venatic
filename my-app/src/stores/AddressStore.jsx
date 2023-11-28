import { makeAutoObservable } from "mobx";

class AddressStore {
  address = 'This will update when an address is selected (example of mobx implementation)';

  postcodeEligible = "NA"

  selectedSize = 'small'; // Default size
  duration = 1; // Default duration

  availabilties = []

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

  setAvailabilties(availability) {
    this.availabilties = availability;
  }

}


export const addressStore = new AddressStore();


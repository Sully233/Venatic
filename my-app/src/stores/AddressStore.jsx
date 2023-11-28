import { makeAutoObservable } from "mobx";

class AddressStore {
  address = 'This will update when an address is selected (example of mobx implementation)';

  postcodeEligible = "NA"

  selectedSize = 'small'; // Default size
  duration = 1; // Default duration

  availabilities = []
  chosenAvailibility = ""

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
    this.chosenAvailibility = timeslot
  }



}


export const addressStore = new AddressStore();


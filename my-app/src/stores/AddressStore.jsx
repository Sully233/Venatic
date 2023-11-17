import { makeAutoObservable } from "mobx";

class AddressStore {
  address = 'This will update when an address is selected (example of mobx implementation)';

  postcodeEligible = "NA"

  constructor() {
    makeAutoObservable(this);
  }

  setAddress(newAddress) {
    this.address = newAddress;
  }

  setPostcodeEligible(eligibility) {
    this.postcodeEligible = eligibility;
  }
}


export const addressStore = new AddressStore();


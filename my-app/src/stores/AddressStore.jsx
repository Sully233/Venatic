import { makeAutoObservable } from "mobx";

class AddressStore {
  address = 'This will update when an address is selected (example of mobx implementation)';

  constructor() {
    makeAutoObservable(this);
  }

  setAddress(newAddress) {
    this.address = newAddress;
  }
}

export const addressStore = new AddressStore();


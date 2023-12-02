import { makeAutoObservable } from "mobx";

class CustomerDetailsStore {
  

  firstName = '';
  
  lastName = '';

  email = '';

  phoneNumber = '';

  constructor() {
    makeAutoObservable(this);
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber
  }
}

export const customerDetailsStore = new CustomerDetailsStore();

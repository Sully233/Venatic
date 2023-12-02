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

  setlastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email
  }

}

export const customerDetailsStore = new CustomerDetailsStore();

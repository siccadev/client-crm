import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});


// Define latePaymentState atom
export const latePaymentState = atom({
  key: 'latePaymentState',
  default: false, // Default value is false
});

import { Store } from "pullstate";
import { StatusBarStyle } from "react-native"; // or the correct module where StatusBarStyle is defined

/*------------------------------------ STATUS BAR STORE ------------------------------------------------*/

export const statusBarStore = new Store<{ barStyle: StatusBarStyle }>({
  barStyle: "light-content",
});

/*------------------------------------ TOAST STORE ------------------------------------------------*/

export enum ToastType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

interface Toast {
  message: string;
  type: ToastType | null;
  active: boolean;
}

export const toastStore = new Store<Toast>({
  message: "",
  type: null,
  active: false,
});

/*------------------------------------ AUTH STORE ------------------------------------------------*/

interface Auth {
  isAuthenticated: boolean;
  email: string;
  isFaceIDAuth: boolean;
  token?: string | null;
  loginToken?: string | null;
  isReturningUser?: boolean | null;
  otp?: string | null;
}

export const authStore = new Store<Auth>({
  isAuthenticated: false,
  email: "",
  isFaceIDAuth: false,
});

/*------------------------------------ ONBOARDING STORE ------------------------------------------------*/

interface Onboarding {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  password: string;
  pin: string;
  token: string | null;
}

export const onboardingStore = new Store<Onboarding>({
  firstName: "",
  lastName: "",
  countryCode: "",
  phone: "",
  password: "",
  pin: "",
  token: "",
});

/*------------------------------------ TRANSFER STORE ------------------------------------------------*/

interface TransferStore {
  cfaAmount: string;
  ngnAmount: string;
  sendingIsCFA?: boolean;
  transactionFee: number;
  rate: number;
  recepientNGN?: {
    bank: string;
    accountNumber: string;
    accountName: string;
    emailAddress: string;
    narration: string;
  } | null;
  recepientCFA?: {
    momoNumber: string;
    fullName: string;
    momoOperator: string;
  } | null;
}
export const transferStoreDefaultValue = {
  cfaAmount: "0.00",
  ngnAmount: "0.00",
  sendingIsCFA: true,
  transactionFee: 2,
  rate: 160,
  recepientNGN: null,
  recepientCFA: null,
};

export const transferStore = new Store<TransferStore>(
  transferStoreDefaultValue
);

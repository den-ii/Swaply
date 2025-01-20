import { Store } from "pullstate";
import { StatusBarStyle } from "react-native"; // or the correct module where StatusBarStyle is defined
import { Country } from "./types/country";
import { Bank } from "./types";
import * as Notifications from "expo-notifications";

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
  isFaceIDAuth?: boolean;
  token?: string | null;
  loginToken?: string | null;
  isReturningUser?: boolean | null;
  otp?: string | null;
  country?: string;
  fullName?: string;
  profileImage?: string;
}

export const authStore = new Store<Auth>({
  isAuthenticated: false,
  email: "",
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
  sendAmount?: string;
  receiveAmount?: string;
  totalAmount?: string;
  sendingCurrency?: Country;
  receivingCurrency?: Country;
  sendingIsCFA?: boolean;
  fee?: string;
  rate?: string;
  recepientNGN: {
    bank?: Bank;
    accountNumber?: string;
    accountName?: string;
    emailAddress?: string;
    narration?: string;
    bank_id?: number;
  };
  recepientCFA: {
    momoNumber?: string;
    fullName?: string;
    momoOperator?: string;
  };
}
export const transferStoreDefaultValue = {
  cfaAmount: "0.00",
  ngnAmount: "0.00",
  sendingIsCFA: true,
  rate: "",
  recepientNGN: {},
  recepientCFA: {},
};

export const transferStore = new Store<TransferStore>(
  transferStoreDefaultValue
);

/*------------------------------------ NOTIFICATION STORE ------------------------------------------------*/
interface Notification {
  token?: string;
  notification?: Notifications.Notification;
}

export const notificationStore = new Store<Notification>({});

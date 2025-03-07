import { Store } from "pullstate";
import { StatusBarStyle } from "react-native"; // or the correct module where StatusBarStyle is defined
import { Country } from "./types/country";
import { Bank } from "./types";
import * as Notifications from "expo-notifications";

/*------------------------------------ Status-bar Store ------------------------------------------------*/

export const statusBarStore = new Store<{ barStyle: StatusBarStyle }>({
  barStyle: "light-content",
});

/*------------------------------------ Toast Store ------------------------------------------------*/

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

/*------------------------------------ Auth Store  ------------------------------------------------*/

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
  userDetails?: any;
}

export const authStore = new Store<Auth>({
  isAuthenticated: false,
  email: "",
});

/*------------------------------------ Onboarding Store ------------------------------------------------*/

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

/*------------------------------------ Transfer Store ------------------------------------------------*/

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

/*------------------------------------ Notification Store ------------------------------------------------*/
interface Notification {
  token?: string;
  notification?: Notifications.Notification;
}

export const notificationStore = new Store<Notification>({});

/*------------------------------------ Filter Store ------------------------------------------------*/
interface Filter {
  startDate: Date | null;
  endDate: Date | null;
  currencySelected: string[];
  active: boolean;
}

export const filterStore = new Store<Filter>({
  startDate: null,
  endDate: null,
  currencySelected: [],
  active: false,
});

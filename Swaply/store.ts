import { Store } from "pullstate";

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

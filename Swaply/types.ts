export enum CountryE {
  NIGERIA = "Nigeria",
  BENIN = "Benin Republic",
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface recipientNGN {
  accountNo: string;
  email: string;
  narration: string;
}

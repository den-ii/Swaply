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

export interface MomoProvider {
  id: number;
  name: string;
  country: string;
  enabled: number;
  logoUrl: string;
  paymentMethod: string;
  prefixes: string;
  supportedCountiesCodes: string;
  deleted: 0;
  updated_at: Date | string;
  created_at: Date | string;
}

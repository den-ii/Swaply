import NGNKYC from "./NGNKYC";
import CFAKYC from "./CFAKYC";

export default function CountryKYC({ country }: { country: string }) {
  switch (country.toLowerCase()) {
    case "nigeria":
      return <NGNKYC />;
    case "benin":
      return <CFAKYC />;
  }
}

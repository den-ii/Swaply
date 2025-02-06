import NGN_32 from "@/assets/images/NGN_32.svg";
import NGN_16 from "@/assets/images/NGN_16.svg";
import NGN_20 from "@/assets/images/NGN_20.svg";
import CFA_32 from "@/assets/images/CFA_32.svg";
import CFA_16 from "@/assets/images/CFA_16.svg";
import CFA_20 from "@/assets/images/CFA_20.svg";

export default function CountrySVG({
  country,
  size,
}: {
  country: string;
  size: number;
}) {
  switch (country.toUpperCase()) {
    case "NG":
      if (size === 32) {
        return <NGN_32 />;
      } else if (size === 16) {
        return <NGN_16 />;
      }
      return <NGN_20 />;
    case "BJ":
      if (size === 32) {
        return <CFA_32 />;
      } else if (size === 16) {
        return <CFA_16 />;
      }
      return <CFA_20 />;
  }
}

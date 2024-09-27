import CFA from "@/assets/images/CFA.svg";
import NGN from "@/assets/images/NGN.svg";

export const GetCountrySVG = ({ country }: { country: string }) => {
  switch (country) {
    case "CFA":
      return <CFA />;
    case "NGN":
      return <NGN />;
    default:
      return <CFA />;
  }
};

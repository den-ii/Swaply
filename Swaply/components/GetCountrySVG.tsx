import CFA from "@/assets/images/CFA.svg";

export const GetCountrySVG = ({ country }: { country: string }) => {
  switch (country) {
    case "CFA":
      return <CFA />;
    default:
      return <CFA />;
  }
};

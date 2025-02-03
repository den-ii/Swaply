import NGN_32 from "@/assets/images/NGN_32.svg";
import NGN_16 from "@/assets/images/NGN_16.svg";
import NGN_20 from "@/assets/images/NGN_20.svg";

export default function CountrySVG({
  country,
  size,
}: {
  country: string;
  size: number;
}) {
  switch (country) {
    case "NG":
      if (size === 32) {
        return <NGN_32 />;
      } else if (size === 16) {
        return <NGN_16 />;
      }
      return <NGN_20 />;
  }
}

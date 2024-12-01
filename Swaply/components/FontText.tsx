import { Colors } from "@/constants/Colors";
import { Text, TextStyle, StyleProp } from "react-native";

interface FontTextProps {
  color?: string;
  fontWeight?: number;
  style?: StyleProp<TextStyle>; // Corrected the prop name and type
  children?: string;
  fontSize?: number;
  fontFamily?: string;
}

const FontText = ({
  color,
  fontWeight,
  fontFamily,
  children,
  fontSize,
  style,
}: FontTextProps) => {
  const fullStyles: TextStyle = {
    ...(style as TextStyle), // Spread the received style prop
    color: color ?? Colors.light.text,
    fontFamily: "Inter_400Regular", // Default font family
    fontSize: fontSize ?? 14,
  };

  // Set the font family based on the fontWeight prop
  if (fontFamily?.toUpperCase() == "P22") {
    switch (fontWeight) {
      case 400:
        fullStyles.fontFamily = "Inter_400Regular";
        break;
      case 500:
        fullStyles.fontFamily = "Inter_500Medium";
        break;
      case 600:
        fullStyles.fontFamily = "P22Mackinac_Bold";
        break;
      case 700:
        fullStyles.fontFamily = "P22Mackinac_Bold";
        break;
      default:
        fullStyles.fontFamily = "Inter_400Regular";
        break;
    }
  } else {
    switch (fontWeight) {
      case 400:
        fullStyles.fontFamily = "Inter_400Regular";
        break;
      case 500:
        fullStyles.fontFamily = "Inter_500Medium";
        break;
      case 600:
        fullStyles.fontFamily = "Inter_600SemiBold";
        break;
      case 700:
        fullStyles.fontFamily = "Inter_700Bold";
        break;
      default:
        fullStyles.fontFamily = "Inter_400Regular";
        break;
    }
  }

  return <Text style={fullStyles}>{children}</Text>;
};

export default FontText;

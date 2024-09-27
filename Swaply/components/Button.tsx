import { Pressable, View } from "react-native";
import FontText from "./FontText";

interface ButtonProps {
  loadingColor?: string;
  bgColor?: string;
  loadingTextColor?: string;
  textColor?: string;
  loading?: boolean;
  text?: string;
  action?: () => void;
}

const Button = ({
  loadingColor,
  bgColor,
  loadingTextColor,
  textColor,
  loading,
  text,
  action,
}: ButtonProps) => {
  return (
    <Pressable onPress={action}>
      <View
        style={{
          backgroundColor: bgColor ?? "black",
          paddingVertical: 20,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontText fontWeight={600} color="white" fontSize={16}>
          {text}
        </FontText>
      </View>
    </Pressable>
  );
};

export default Button;

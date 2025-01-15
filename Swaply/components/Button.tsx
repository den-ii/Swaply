import { ActivityIndicator, Pressable, View } from "react-native";
import FontText from "./FontText";
import * as Haptics from "expo-haptics";

interface ButtonProps {
  loadingColor?: string;
  bgColor?: string;
  loadingTextColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
  action: () => void;
}

const Button = ({
  loadingColor = "#AEB7BF",
  bgColor = "#121212",
  loadingTextColor = "#fff",
  textColor,
  loading,
  disabled,
  text,
  action,
}: ButtonProps) => {
  const handleOnPress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    action();
  };

  return (
    <Pressable onPress={handleOnPress}>
      <View
        style={{
          backgroundColor: disabled || loading ? loadingColor : bgColor,
          height: 56,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!loading && (
          <FontText
            fontWeight={600}
            color={textColor ? textColor : "white"}
            fontSize={16}
          >
            {text}
          </FontText>
        )}
        {loading && <ActivityIndicator size="small" color="#fff" />}
      </View>
    </Pressable>
  );
};

export default Button;

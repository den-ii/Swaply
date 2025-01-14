import { Platform } from "react-native";

export const UI = {
  paddingHorizontal: 15,
  input: {
    verticalPadding: Platform.OS === "ios" ? 12 : 9,
    horizontalPadding: 16,
    borderRadius: 12,
    borderWidth: 1.3,
  },
};

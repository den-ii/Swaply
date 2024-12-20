/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  base: "#039AFF",
  error: "#F23C57",
  success: "#0D9013",

  light: {
    neutral: "#757D87",
    textPrimary: "#026DB5",
    success: "#0D9013",
    textDefault: "#2C3137",
    textDisabled: "#AEB7BF",
    bgButtonDisabled: "",
    body: "#FAFBFB",
    text: "#11181C",
    accent: "#FE6C02",
    lightAccent: "#FFF2E8",
    error: "#F23C57",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#757D87",
    tabIconSelected: "#FE6C02",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

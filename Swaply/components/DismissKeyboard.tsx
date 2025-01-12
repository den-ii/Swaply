import { Keyboard, Pressable } from "react-native";

export default function DismissKeyboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      {children}
    </Pressable>
  );
}

import { useState } from "react";
import { Pressable, View } from "react-native";
import FontText from "./FontText";
import Backspace from "@/assets/images/backspace.svg";
import * as Haptics from "expo-haptics";

const NumberButton = ({
  value,
  func,
}: {
  value: number | string;
  func: (value: string | number) => void;
}) => {
  const [color, setColor] = useState("#ECEFF1");

  function handleTouchableFeedback() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    setColor("#e8e8e8");
    func(value);
    setTimeout(() => {
      setColor("#ECEFF1");
    }, 100);
  }

  if (value === "*") {
    return (
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    );
  }
  return (
    <Pressable onPress={handleTouchableFeedback}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 70,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NumberButtonChildren value={value} />
      </View>
    </Pressable>
  );
};

const NumberButtonChildren = ({ value }: { value: number | string }) => {
  if (value === "backspace") {
    return <Backspace />;
  }
  return <FontText fontSize={24} fontWeight={600}>{`${value}`}</FontText>;
};

export default function Keypad({
  func,
}: {
  func: (value: number | string) => void;
}) {
  const [numpad, setNumpad] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: "*", value: "*" },
    { id: 0, value: 0 },
    { id: "x", value: "backspace" },
  ]);

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: 279,
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        {numpad.map((numpad) => (
          <NumberButton key={numpad.id} value={numpad.value} func={func} />
        ))}
      </View>
    </View>
  );
}

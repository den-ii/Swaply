import { useState } from "react";
import { Pressable, View } from "react-native";
import FontText from "./FontText";
import Backspace from "@/assets/images/backspace.svg";
import * as Haptics from "expo-haptics";
import Identity from "@/assets/images/identity2.svg";
import * as SecureStore from "expo-secure-store";

const NumberButton = ({
  value,
  func,
  loading,
  showFaceId,
}: {
  value: number | string;
  func: (value: string | number) => void;
  showFaceId?: boolean;
  loading?: boolean;
}) => {
  const [color, setColor] = useState("#ECEFF1");

  function handleTouchableFeedback() {
    if (loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    setColor("#e8e8e8");
    func(value);
    setTimeout(() => {
      setColor("#ECEFF1");
    }, 100);
  }

  if (value === "*" && !showFaceId) {
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
  } else if (value === "*") {
    return <Identity />;
  }
  return <FontText fontSize={24} fontWeight={600}>{`${value}`}</FontText>;
};

export default function Keypad({
  func,
  loading,
  showFaceId,
}: {
  func: (value: number | string) => void;
  loading?: boolean;
  showFaceId?: boolean;
}) {
  console.log("showFaceId", showFaceId);
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
          <NumberButton
            key={numpad.id}
            showFaceId={showFaceId}
            value={numpad.value}
            func={func}
            loading={loading}
          />
        ))}
      </View>
    </View>
  );
}

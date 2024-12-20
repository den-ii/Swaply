import { View } from "react-native";

export default function Toggle() {
  return (
    <View
      style={{
        width: 36,
        backgroundColor: "#ECEFF1",
        height: 22,
        borderRadius: 100,
        paddingHorizontal: 3,
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 16,
          height: 16,
          backgroundColor: "white",
          borderRadius: 100,
        }}
      ></View>
    </View>
  );
}

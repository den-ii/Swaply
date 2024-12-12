import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, View } from "react-native";
import Star from "@/assets/images/star.svg";
import { useState } from "react";
import Button from "@/components/Button";

export default function Notifications() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        padding: UI.paddingHorizontal,
        backgroundColor: Colors.light.body,
      }}
    >
      <View style={{ gap: 8, paddingBottom: 20 }}>
        <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
          Notifications
        </FontText>
        <FontText color={Colors.light.neutral} fontWeight={400}>
          Select your notification preferences
        </FontText>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#F5F7F8",
          borderRadius: 16,
        }}
      >
        <Pressable>
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: "#F5F7F8",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FontText fontWeight={500}>Push notifications</FontText>
            <View></View>
          </View>
        </Pressable>
        <Pressable>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FontText fontWeight={500}>Email notifications</FontText>
            <View></View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

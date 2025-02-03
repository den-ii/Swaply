import { Tabs, usePathname, useSegments } from "expo-router";
import Home from "@/assets/images/tab_home.svg";
import More from "@/assets/images/tab_more.svg";
import { Colors } from "@/constants/Colors";
import TabBeneficiary from "@/components/TabBeneficiary";
import TabHistory from "@/components/TabHistory";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";


const tabBarStyleIOS = {
  paddingTop: 8,
  height: 86,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  padding: 0,
  borderTopColor: "#F2F6F6",
};

const tabBarStyleAndroid = {
  paddingTop: 8,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  padding: 0,
  height: 80,
  borderTopColor: "#F2F6F6",
};

const tabBarLabelStyleIOS = {
  fontSize: 12,
  fontFamily: "Inter_600SemiBold",
};

const tabBarLabelStyleAndroid = {
  fontSize: 12,
  fontFamily: "Inter_600SemiBold",
  height: 35,
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,

        tabBarStyle:
          Platform.OS === "ios" ? tabBarStyleIOS : tabBarStyleAndroid,
        tabBarLabelStyle:
          Platform.OS === "ios" ? tabBarLabelStyleIOS : tabBarLabelStyleAndroid,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              fill={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="beneficiary"
        options={{
          tabBarLabel: "Beneficiary",
          tabBarIcon: ({ focused }) => (
            <TabBeneficiary
              fill={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ focused }) => (
            <TabHistory
              fill={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarLabel: "More",

          tabBarIcon: ({ focused }) => (
            <More
              fill={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

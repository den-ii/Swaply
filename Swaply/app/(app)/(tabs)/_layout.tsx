import { Tabs, usePathname, useSegments } from "expo-router";
import Home from "@/assets/images/tab_home.svg";
import More from "@/assets/images/tab_more.svg";
import { Colors } from "@/constants/Colors";
import TabBeneficiary from "@/components/TabBeneficiary";
import TabHistory from "@/components/TabHistory";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const auth = true;
  const first_time = false;

  if (!auth) {
    if (first_time) return <Redirect href={"/(onboarding)/"} />;
    return <Redirect href={"/(auth)/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,

        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter_600SemiBold",
        },
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

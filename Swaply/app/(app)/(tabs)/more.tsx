import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Star from "@/assets/images/star.svg";
import Profile from "@/assets/images/profile.svg";
import Security from "@/assets/images/security.svg";
import KYC from "@/assets/images/kyc.svg";
import FaceID from "@/assets/images/face_id.svg";
import PrivacyPolicy from "@/assets/images/privacy-policy.svg";
import Language from "@/assets/images/language.svg";
import ContactUs from "@/assets/images/contact-us.svg";
import Notifications from "@/assets/images/notifications.svg";
import SectionIcon from "@/components/more/SectionIcon";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { router } from "expo-router";
import { logoutUser } from "@/api/authApi";

export default function More() {
  return (
    <SafeAreaView
      style={{
        paddingTop: 16,
        flex: 1,
        backgroundColor: Colors.light.body,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 16,
          paddingHorizontal: UI.paddingHorizontal,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 16,
          }}
        >
          <FontText fontFamily="P22" fontSize={34} fontWeight={700}>
            More
          </FontText>
          <Pressable onPress={logoutUser}>
            <View
              style={{
                paddingHorizontal: 12,
                height: 32,
                justifyContent: "center",
                borderRadius: 100,
                backgroundColor: "#ECEFF1",
              }}
            >
              <FontText fontSize={14} fontWeight={600}>
                Log out
              </FontText>
            </View>
          </Pressable>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.push("/account-limit")}>
            <View
              style={{
                padding: 16,
                marginTop: 16,
                borderWidth: 1,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderColor: "#F5F7F8",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <View style={{ gap: 8 }}>
                <View
                  style={{
                    backgroundColor: Colors.light.accent,
                    width: 48,
                    height: 48,
                    borderRadius: 48,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontText fontSize={18} fontWeight={600} color={"#fff"}>
                    AD
                  </FontText>
                </View>
                <FontText fontFamily="p22" fontSize={24} fontWeight={700}>
                  Ayomide Daniel
                </FontText>
                <FontText fontSize={14} color={Colors.light.neutral}>
                  Daniel@gmail.com
                </FontText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 24,
                  justifyContent: "center",
                  gap: 4,
                  paddingHorizontal: 9,
                  borderRadius: 75,
                  alignItems: "center",
                  backgroundColor: "#FFBB8B",
                }}
              >
                <Star />
                <FontText fontSize={10.5} fontWeight={500}>
                  Tier 1
                </FontText>
              </View>
            </View>
          </Pressable>
          <View style={{ paddingTop: 20, paddingBottom: 16 }}>
            <View>
              <FontText
                fontSize={12}
                color={Colors.light.neutral}
                fontWeight={500}
                style={{ paddingLeft: 16 }}
              >
                GENERAL
              </FontText>

              <View style={styles.sectionContainer}>
                <Pressable>
                  <View style={styles.list}>
                    <View style={styles.listDescription}>
                      <SectionIcon Icon={Profile} />
                      <FontText fontSize={14} fontWeight={500}>
                        My profile
                      </FontText>
                    </View>
                    <ChevronRight fill={Colors.light.neutral} />
                  </View>
                </Pressable>
                <Pressable onPress={() => router.push("/(app)/(security)")}>
                  <View style={styles.list}>
                    <View style={styles.listDescription}>
                      <SectionIcon Icon={Security} />
                      <FontText fontSize={14} fontWeight={500}>
                        Security
                      </FontText>
                    </View>
                    <ChevronRight fill={Colors.light.neutral} />
                  </View>
                </Pressable>
                <Pressable onPress={() => router.push("/notifications")}>
                  <View style={styles.list}>
                    <View style={styles.listDescription}>
                      <SectionIcon Icon={Notifications} />
                      <View style={{ gap: 2 }}>
                        <FontText fontSize={14} fontWeight={500}>
                          Notifications
                        </FontText>
                        <FontText fontSize={12} color={Colors.light.neutral}>
                          Receive emails about the product
                        </FontText>
                      </View>
                    </View>
                    <ChevronRight fill={Colors.light.neutral} />
                  </View>
                </Pressable>
                <Pressable onPress={() => router.push("/(app)/(kyc)")}>
                  <View style={styles.listWithoutBorder}>
                    <View style={styles.listDescription}>
                      <SectionIcon Icon={KYC} />
                      <FontText fontSize={14} fontWeight={500}>
                        KYC
                      </FontText>
                    </View>
                    <ChevronRight fill={Colors.light.neutral} />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 8 }}>
            <FontText
              fontSize={12}
              color={Colors.light.neutral}
              fontWeight={500}
              style={{ paddingLeft: 16 }}
            >
              OTHERS
            </FontText>
            <View style={styles.sectionContainer}>
              <Pressable>
                <View style={styles.list}>
                  <View style={styles.listDescription}>
                    <SectionIcon Icon={FaceID} />
                    <FontText fontSize={14} fontWeight={500}>
                      Face ID unlock
                    </FontText>
                  </View>
                  <ChevronRight fill={Colors.light.neutral} />
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.list}>
                  <View style={styles.listDescription}>
                    <SectionIcon Icon={PrivacyPolicy} />
                    <FontText fontSize={14} fontWeight={500}>
                      Privacy policy
                    </FontText>
                  </View>
                  <ChevronRight fill={Colors.light.neutral} />
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.list}>
                  <View style={styles.listDescription}>
                    <SectionIcon Icon={Language} />
                    <View style={{ gap: 2 }}>
                      <FontText fontSize={14} fontWeight={500}>
                        App language
                      </FontText>
                      <FontText fontSize={12} color={Colors.light.neutral}>
                        English
                      </FontText>
                    </View>
                  </View>
                  <ChevronRight fill={Colors.light.neutral} />
                </View>
              </Pressable>
              <Pressable>
                <View style={styles.listWithoutBorder}>
                  <View style={styles.listDescription}>
                    <SectionIcon Icon={ContactUs} />
                    <FontText fontSize={14} fontWeight={500}>
                      Contact us
                    </FontText>
                  </View>
                  <ChevronRight fill={Colors.light.neutral} />
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#fff",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#F5F7F8",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F8",
  },
  listWithoutBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  listDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});

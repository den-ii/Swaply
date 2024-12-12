import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import ChevronRight from "@/assets/images/chevron-right.svg";
import { styles } from "@/app/(app)/(tabs)/more";
import { View, Pressable } from "react-native";
import { router } from "expo-router";

export default function NGNKYC() {
  return (
    <View style={styles.sectionContainer}>
      <Pressable onPress={() => router.push("/(kyc)/nin")}>
        <View style={styles.list}>
          <View style={{ gap: 2 }}>
            <FontText fontSize={14} fontWeight={500}>
              NIN
            </FontText>
            <FontText fontSize={12} color={Colors.light.neutral}>
              National Identification Number
            </FontText>
          </View>
          <ChevronRight fill={Colors.light.neutral} />
        </View>
      </Pressable>
      <Pressable onPress={() => router.push("/(kyc)/bvn")}>
        <View style={styles.list}>
          <View style={{ gap: 2 }}>
            <FontText fontSize={14} fontWeight={500}>
              BVN
            </FontText>
            <FontText fontSize={12} color={Colors.light.neutral}>
              Bank Verification Number
            </FontText>
          </View>
          <ChevronRight fill={Colors.light.neutral} />
        </View>
      </Pressable>
      <Pressable onPress={() => router.push("/next_of_kin")}>
        <View style={styles.list}>
          <View style={styles.listDescription}>
            <FontText
              fontSize={14}
              fontWeight={500}
              style={{ paddingVertical: 4 }}
            >
              Next of Kin
            </FontText>
          </View>
          <ChevronRight fill={Colors.light.neutral} />
        </View>
      </Pressable>
      <Pressable onPress={() => router.push("/ngn_address")}>
        <View style={styles.listWithoutBorder}>
          <View style={styles.listDescription}>
            <FontText
              fontSize={14}
              fontWeight={500}
              style={{ paddingVertical: 4 }}
            >
              Address
            </FontText>
          </View>
          <ChevronRight fill={Colors.light.neutral} />
        </View>
      </Pressable>
    </View>
  );
}

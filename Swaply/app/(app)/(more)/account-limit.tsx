import FontText from "@/components/FontText";
import { Colors } from "@/constants/Colors";
import { UI } from "@/constants/UI";
import { View } from "react-native";
import Star from "@/assets/images/star.svg";
import { useState } from "react";
import Button from "@/components/Button";

const tiers = [
  {
    transactionLimit: "₦50,000",
    requirements: null,
  },
  {
    transactionLimit: "₦200,000",
    requirements: ["NIN", "Next of Kin", "BVN", "Address"],
  },
];

export default function AccountLimit() {
  const [activeIndex, setActiveIndex] = useState(0);
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
          Account Limit
        </FontText>
        <FontText color={Colors.light.neutral} fontWeight={400}>
          The higher your account tier level, the higher your daily transaction
          limit.
        </FontText>
      </View>
      <View>
        {tiers.map((tier, index) => (
          <View
            key={index}
            style={{
              padding: 16,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: activeIndex === index ? "#039AFF" : "#F5F7F8",

              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "flex-start", gap: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    height: 24,
                    justifyContent: "center",
                    gap: 4,
                    paddingHorizontal: 9,
                    borderRadius: 75,
                    alignItems: "center",
                    backgroundColor:
                      index === activeIndex ? "#FFBB8B" : "#85D1FF",
                  }}
                >
                  <Star />
                  <FontText fontSize={10.5} fontWeight={500}>
                    {`Tier ${index + 1}`}
                  </FontText>
                </View>
                <View>
                  <FontText color={Colors.light.neutral}>
                    Daily transaction limit
                  </FontText>
                </View>
                <View>
                  <FontText fontSize={12} color={Colors.light.neutral}>
                    Requirements
                  </FontText>
                </View>
              </View>

              <View style={{ alignItems: "flex-end", gap: 16 }}>
                <View
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    backgroundColor:
                      activeIndex === index
                        ? "#F5F7F8"
                        : activeIndex + 1 === index
                        ? "#DAF1E2"
                        : "#DAF1E2",
                    borderRadius: 75,
                  }}
                >
                  <FontText
                    fontSize={12}
                    fontWeight={500}
                    color={
                      activeIndex === index
                        ? Colors.light.textDefault
                        : activeIndex + 1 === index
                        ? "#0D9013"
                        : "#0D9013"
                    }
                  >
                    {activeIndex === index
                      ? "Current"
                      : activeIndex + 1 === index
                      ? "Up Next"
                      : "Upcoming"}
                  </FontText>
                </View>
                <FontText fontWeight={700} fontSize={16}>
                  {tier.transactionLimit}
                </FontText>
              </View>
            </View>
            <View
              style={{
                marginTop: 6,
                flexDirection: "row",
                gap: 4,
                flexWrap: "wrap",
              }}
            >
              {tier.requirements ? (
                tier.requirements.map((requirement, index) => (
                  <View
                    key={index}
                    style={{
                      width: "40%",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <View
                      style={{
                        width: 2,
                        height: 2,
                        backgroundColor: "#AEB7BF",
                      }}
                    ></View>
                    <FontText fontSize={12}>{requirement}</FontText>
                  </View>
                ))
              ) : (
                <FontText fontSize={12}>
                  No verification required for this level
                </FontText>
              )}
            </View>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button text="Upgrade to Tier 2" action={() => {}} />
      </View>
    </View>
  );
}

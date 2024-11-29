import NoSearchFound from "@/assets/images/no-search-found.svg";
import { Pressable, View } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";

export default function NotFound({ setSearchVal }: { setSearchVal: Function }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <NoSearchFound width={100} height={100} />
          <View style={{ marginTop: 20 }}>
            <FontText
              fontSize={20}
              fontWeight={500}
              style={{ textAlign: "center" }}
            >
              No results found
            </FontText>
            <FontText
              fontSize={14}
              style={{
                textAlign: "center",
                paddingHorizontal: 20,
                marginTop: 8,
              }}
              color={Colors.light.neutral}
            >
              We couldn't find any results that matches your search. Check
              spelling or try another word.
            </FontText>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Pressable onPress={() => setSearchVal("")}>
                <View
                  style={{
                    borderRadius: 100,
                    padding: 16,
                    backgroundColor: "#ECEFF1",
                    marginTop: 30,
                  }}
                >
                  <FontText fontSize={16} fontWeight={600}>
                    Try again
                  </FontText>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        {/* <Text style={{ fontSize: 20 }}>No Beneficiary</Text> */}
      </View>
    </View>
  );
}

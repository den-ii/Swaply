import { View } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import SuccessScreen from "@/components/SuccessScreen";

export default function ResetSuccess() {
  const router = useRouter();

  const handleOkay = () => {
    router.navigate("/");
  };
  return (
    <SuccessScreen
      headerText="New swaply code saved"
      leadingText="You can now enter swaply with your new code"
    >
      <View
        style={{
          marginTop: 16,
          marginBottom: 4,
          height: "60%",
        }}
      >
        <Button text={"Continue"} action={handleOkay} />
      </View>
    </SuccessScreen>
  );
}

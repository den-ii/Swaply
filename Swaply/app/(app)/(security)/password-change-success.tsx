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
      headerText="New password saved"
      leadingText="You can now login using your new password"
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

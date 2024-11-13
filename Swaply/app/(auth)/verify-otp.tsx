import { router } from "expo-router";

import Otp from "@/components/Otp";

export default function VerifyOtp() {
  return (
    <>
      <Otp
        title="Reset password"
        email={"danielayomidesolomon@gmail.com"}
        action={() => router.push("/reset-password")}
        actionText={"Continue"}
      />
    </>
  );
}

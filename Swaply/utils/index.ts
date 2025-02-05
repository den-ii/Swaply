import * as Contacts from "expo-contacts";
import * as LocalAuthentication from "expo-local-authentication";

export async function getContact() {
  console.log("getContact");
  const { status } = await Contacts.requestPermissionsAsync();
  console.log("status: ", status);
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      return data;
    }
  }
  return [];
}

export const checkAuthType = async () => {
  const authType = (
    await LocalAuthentication.supportedAuthenticationTypesAsync()
  ).includes(2);

  const authLevel = await LocalAuthentication.getEnrolledLevelAsync();
  console.log("authType:", authLevel);

  return (
    authLevel === LocalAuthentication.SecurityLevel.BIOMETRIC_STRONG && authType
  );
};

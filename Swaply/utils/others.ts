import * as Contacts from "expo-contacts";

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

//ldkjdjjdj

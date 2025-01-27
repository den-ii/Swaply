import * as Contacts from "expo-contacts";

export async function getContact() {
  const { status } = await Contacts.requestPermissionsAsync();
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

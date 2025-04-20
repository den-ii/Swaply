import { API } from "@/api";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

const BaseUrlPrompt = () => {
  const [visible, setVisible] = useState(true);
  const [input, setInput] = useState("");

  const setBaseUrl = () => {
    API.BaseUrl = input;
    setVisible(false);
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.promptBox}>
          <Text style={styles.label}>Enter BASE_URL:</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="http://"
          />
          <View style={styles.actions}>
            <Button title="Cancel" onPress={() => setVisible(false)} />
            <Button title="OK" onPress={setBaseUrl} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000088",
  },
  promptBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BaseUrlPrompt;

import { ReactElement } from "react";
import { Modal, Pressable, View, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function LargeModal({
  modalActive,
  closeModal,
  translateY,
  children,
}: {
  modalActive: boolean;
  closeModal: () => void;
  translateY: SharedValue<number>;
  children?: ReactElement;
}) {
  const pan = Gesture.Pan();

  const gesture = pan
    .onBegin((e) => {
      console.log(e);
    })
    .onUpdate((e) => {
      console.log(e);
      if (e.translationY > 0) translateY.value = e.translationY;

      // offset.value = {
      //   x: e.translationX + start.value.x,
      //   y: e.translationY + start.value.y,
      // };
    })
    .onEnd((e) => {
      if (e.translationY > 250) {
        closeModal();
      } else translateY.value = withTiming(0);
      // translateY.value += e.translationY;
      // start.value = {
      //   x: offset.value.x,
      //   y: offset.value.y,
      // };
    });

  return (
    <Modal visible={modalActive} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.overlay2}>
          <Pressable style={{ flex: 1 }} onPress={closeModal}>
            <View style={{ flex: 1 }}></View>
          </Pressable>
          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[styles.modal, { transform: [{ translateY }] }]}
            >
              {children}
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(44, 49, 55, 0.5)",
  },
  overlay2: {
    flex: 1,
    justifyContent: "space-between",
  },
  modal: {
    backgroundColor: "#FAFBFB",
    zIndex: 50,
    height: "92%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 16,
  },
});

import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export function useCloseModal(modalActive: boolean, handleModal: Function) {
  const translateY = useSharedValue(1000);

  useEffect(() => {
    if (modalActive) translateY.value = withTiming(0);
    // setTimeout(
    //   () => (translateY.value = withTiming(0, { duration: 300 })),
    //   300
    // );
  }, [modalActive]);

  const closeModal = () => {
    translateY.value = withTiming(1000);
    setTimeout(() => {
      handleModal(false);
    }, 300);
  };
  return { translateY, closeModal };
}

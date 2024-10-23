import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

export function useCloseModal(handleModal: Function) {
  const translateY = useSharedValue(1000);

  useEffect(() => {
    translateY.value = withTiming(0);
  }, []);

  const closeModal = () => {
    translateY.value = withTiming(1000);
    setTimeout(() => {
      handleModal(false);
      translateY.value = 0;
    }, 300);
  };
  return { translateY, closeModal };
}

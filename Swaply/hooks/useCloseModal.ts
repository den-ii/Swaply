import { useSharedValue, withTiming } from "react-native-reanimated";

export function useCloseModal(handleModal: Function) {
  const translateY = useSharedValue(0);
  const closeModal = () => {
    translateY.value = withTiming(1000);
    setTimeout(() => {
      handleModal(false);
      translateY.value = 0;
    }, 400);
  };
  return { translateY, closeModal };
}

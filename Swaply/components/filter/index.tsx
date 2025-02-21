import { useCloseModal } from "@/hooks/useCloseModal";
import CustomModal from "../modals/CustomModal";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import FontText from "../FontText";
import { Colors } from "@/constants/Colors";
import Close from "@/assets/images/close.svg";
import { ScrollView } from "react-native-gesture-handler";
import CalenderIcon from "@/assets/images/calendar.svg";
import Button from "../Button";
import MainFilter from "./MainFilter";
import CalendarPicker from "./CalenderPicker";

export default function Filter({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: Function;
}) {
  const { translateY, closeModal } = useCloseModal(modalActive, setModalActive);
  const [endPicker, setEndPicker] = useState(false);
  const [startPicker, setStartPicker] = useState(false);

  const calenderPicker = endPicker || startPicker;

  const toggleStartPicker = () => {
    setEndPicker(false);
    setStartPicker((picker) => !picker);
  };

  const toggleEndPicker = () => {
    setStartPicker(false);
    setEndPicker((picker) => !picker);
  };

  const closePicker = () => {
    setStartPicker(false);
    setEndPicker(false);
  };

  const closeModals = () => {
    closePicker();
    closeModal();
  };

  return (
    <CustomModal
      modalActive={modalActive}
      closeModal={closeModals}
      translateY={translateY}
      height={endPicker || startPicker ? 656 : 468}
      endLimit={100}
    >
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable onPress={closeModals}>
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#F5F7F8",
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Close fill="#757D87" />
            </View>
          </Pressable>
        </View>
        {!calenderPicker && (
          <MainFilter
            toggleStartPicker={toggleStartPicker}
            toggleEndPicker={toggleEndPicker}
          />
        )}
        {calenderPicker && (
          <CalendarPicker startPicker={startPicker} endPicker={endPicker} />
        )}
      </>
    </CustomModal>
  );
}

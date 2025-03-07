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
import { filterStore } from "@/store";

function convertDateToString(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options).replace(" ", " ");
}

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
  const startDate = filterStore.useState((s) => s.startDate);
  const currencySelected = filterStore.useState((s) => s.currencySelected);

  const [startDateString, setStartDateString] = useState<string>(
    convertDateToString(new Date())
  );
  const [endDateString, setEndDateString] = useState<string>(
    convertDateToString(new Date())
  );

  const endDate = filterStore.useState((s) => s.endDate);

  const calenderPicker = endPicker || startPicker;

  const toggleStartPicker = () => {
    setEndPicker(false);
    setStartPicker((picker) => !picker);
  };

  const clearFilter = () => {
    filterStore.update((s) => {
      s.currencySelected = [];
      s.startDate = null;
      s.endDate = null;
      s.active = false;
    });
  };

  const applyFilter = () => {
    if (startDate || endDate || currencySelected) {
      filterStore.update((s) => {
        s.active = true;
      });
    }
    closeModal();
  };

  const toggleCurrencySelect = (currency: string) => {
    if (currencySelected.includes(currency)) {
      const newCurrencySelected = currencySelected.filter(
        (selected) => selected !== currency
      );
      filterStore.update((s) => {
        s.currencySelected = newCurrencySelected;
      });
    } else {
      filterStore.update((s) => {
        s.currencySelected = [...s.currencySelected, currency];
      });
    }
  };

  const applyCalenderFilter = (markedDate: Date) => {
    console.log("markedDate", markedDate);
    if (startPicker) {
      filterStore.update((s) => {
        s.startDate = markedDate;
      });
      setStartDateString(convertDateToString(markedDate));
    } else if (endPicker) {
      filterStore.update((s) => {
        s.endDate = markedDate;
      });
      setStartDateString(convertDateToString(markedDate));
    }

    setEndPicker(false);
    setStartPicker(false);
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
            startDate={startDate}
            endDate={endDate}
            toggleCurrencySelect={toggleCurrencySelect}
            currencySelected={currencySelected}
            startDateString={startDateString}
            endDateString={endDateString}
            clearFilter={clearFilter}
            applyFilter={applyFilter}
          />
        )}
        {calenderPicker && (
          <CalendarPicker
            startPicker={startPicker}
            endPicker={endPicker}
            startDate={startDate}
            endDate={endDate}
            applyCalenderFilter={applyCalenderFilter}
          />
        )}
      </>
    </CustomModal>
  );
}

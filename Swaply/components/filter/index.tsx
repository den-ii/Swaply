import { useCloseModal } from "@/hooks/useCloseModal";
import CustomModal from "../modals/CustomModal";
import React, { useEffect, useState } from "react";
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
  const filterDataFromStore = filterStore.useState((s) => s);
  const [filterData, setFilterData] = useState(filterDataFromStore);
  const [startDateString, setStartDateString] = useState<string>(
    convertDateToString(new Date())
  );
  const [endDateString, setEndDateString] = useState<string>(
    convertDateToString(new Date())
  );

  const calenderPicker = endPicker || startPicker;

  const toggleStartPicker = () => {
    setEndPicker(false);
    setStartPicker((picker) => !picker);
  };

  const clearFilter = () => {
    const emptyFilter = {
      currencySelected: [],
      startDate: null,
      endDate: null,
      active: false,
    };
    filterStore.update((s) => {
      s.currencySelected = [];
      s.startDate = null;
      s.endDate = null;
      s.active = false;
    });
    setFilterData(emptyFilter);
  };

  const applyFilter = () => {
    if (
      filterData.startDate ||
      filterData.endDate ||
      filterData.currencySelected
    ) {
      filterStore.update((s) => {
        s.active = true;
        s.currencySelected = filterData.currencySelected;
        s.endDate = filterData.endDate;
        s.startDate = filterData.startDate;
      });
    }
    closeModal();
  };

  const toggleCurrencySelect = (currency: string) => {
    if (filterData.currencySelected.includes(currency)) {
      const newCurrencySelected = filterData.currencySelected.filter(
        (selected) => selected !== currency
      );

      setFilterData((filterData) => ({
        ...filterData,
        currencySelected: newCurrencySelected,
      }));
    } else {
      setFilterData((filterData) => ({
        ...filterData,
        currencySelected: [...filterData.currencySelected, currency],
      }));
    }
  };

  const applyCalenderFilter = (markedDate: Date) => {
    console.log("markedDate", markedDate);
    if (startPicker) {
      setFilterData((filterData) => ({
        ...filterData,
        startDate: markedDate,
      }));
      setStartDateString(convertDateToString(markedDate));
    } else if (endPicker) {
      setFilterData((filterData) => ({
        ...filterData,
        endDate: markedDate,
      }));
      setEndDateString(convertDateToString(markedDate));
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
            startDate={filterData.startDate}
            endDate={filterData.endDate}
            toggleCurrencySelect={toggleCurrencySelect}
            currencySelected={filterData.currencySelected}
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
            startDate={filterData.startDate}
            endDate={filterData.endDate}
            applyCalenderFilter={applyCalenderFilter}
          />
        )}
      </>
    </CustomModal>
  );
}

import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import ChevronRight from "@/assets/images/chevron-right.svg";
import FontText from "../FontText";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import Button from "../Button";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
};

LocaleConfig.defaultLocale = "en";

const DateHeader = ({ date }: { date: Date }) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleDateString("en-US", {
    month: "long",
  });
  const year = newDate.toLocaleDateString("en-US", {
    year: "numeric",
  });
  return (
    <View>
      <FontText fontWeight={600} fontSize={16}>
        {month.length > 6 ? `${month.slice(0, 3)} ${year}` : `${month} ${year}`}
      </FontText>
    </View>
  );
};

function checkMarkedDate(
  startPicker: boolean,
  endPicker: boolean,
  startDate: Date | null,
  endDate: Date | null
) {
  if (startPicker) {
    return startDate ? startDate : new Date();
  } else if (endPicker) {
    return endDate ? endDate : new Date();
  }
  return new Date();
}

export default function CalenderPicker({
  startPicker,
  endPicker,
  startDate,
  endDate,
  applyCalenderFilter,
}: {
  startPicker: boolean;
  endPicker: boolean;
  startDate: Date | null;
  endDate: Date | null;
  applyCalenderFilter: (markedDate: Date) => void;
}) {
  console.log(startDate);
  const [markedDate, setMarkedDate] = useState<Date>(
    checkMarkedDate(startPicker, endPicker, startDate, endDate)
  );
  const currentDate = new Date();

  const changeMarkedDate = (date: any) => {
    setMarkedDate(new Date(date.timestamp));
  };

  return (
    <View style={{ flex: 1, marginTop: 16, justifyContent: "space-between" }}>
      <View>
        <View style={{ marginBottom: 32 }}>
          <FontText fontFamily="p22" fontWeight={700} fontSize={24}>
            {startPicker ? "Start date" : "End date"}
          </FontText>
        </View>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: "#ECEFF1",
            borderRadius: 16,
            fontFamily: "Inter_600SemiBold",
            backgroundColor: "white",
            paddingVertical: 12,
          }}
          markingType="custom"
          markedDates={{
            [markedDate?.toISOString().split("T")[0]]: {
              selected: true,
              customStyles: {
                container: {
                  backgroundColor: "#039AFF",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                text: {
                  color: "#fff",
                },
              },
            },
            [currentDate?.toISOString().split("T")[0]]: {
              selected: true,
              customStyles: {
                container: {
                  backgroundColor: "#D8EFFF",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
                text: {
                  color: "#026DB5",
                },
              },
            },
          }}
          headerStyle={{
            marginBottom: 24,
          }}
          renderHeader={(date: Date) => <DateHeader date={date} />}
          onDayPress={(date: Date) => changeMarkedDate(date)}
          renderArrow={(direction: any) => (
            <ChevronRight
              fill={"#8D8D8D"}
              style={{
                transform: [
                  { rotate: direction === "left" ? "180deg" : "0deg" },
                ],
                marginLeft: direction === "left" ? -4 : 0,
                marginRight: direction === "right" ? -4 : 0,
              }}
            />
          )}
          theme={{
            fontFamily: "Inter_600SemiBold",
            textDayFontFamily: "Inter_600SemiBold",
            textMonthFontFamily: "Inter_600SemiBold",
            textDayHeaderFontFamily: "Inter_600SemiBold",
            textDisabledColor: "#fff",
            textDayHeaderFontSize: 10,
            textDayHeaderFontWeight: "600",
            dayTextColor: "#2C3137",
            dotColor: Colors.base,
            textDayFontSize: 14,
            "stylesheet.calendar.header": {
              week: {
                marginTop: 42,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              },

              dayTextAtIndex0: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex1: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex2: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex3: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex4: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex5: {
                color: Colors.light.neutral,
              },
              dayTextAtIndex6: {
                color: Colors.light.neutral,
              },
            },
          }}
          // onDayPress={(day: any) => {
          //   console.log("selected day", day);
          // }}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <Button text="Apply" action={() => applyCalenderFilter(markedDate)} />
      </View>
    </View>
  );
}

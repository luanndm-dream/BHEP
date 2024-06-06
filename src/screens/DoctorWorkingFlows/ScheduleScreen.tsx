import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { globalStyle } from "src/constants";
import { ButtonComponent, Header, TimePickerComponent } from "@/components";
import TimeBox from "./TimeBox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalColor } from "src/constants/color";

const ScheduleScreen = () => {
  const [selected, setSelected] = useState("");
  const [timeSlots, setTimeSlots] = useState<{ [date: string]: string[] }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [fromTime, setFromTime] = useState<any>();
  const [toTime, setToTime] = useState<any>();

  const [activeComponent, setActiveComponent] = useState<String>();

  const onPressTimePicker = (type: String) => {
    setIsVisible(true);
    setActiveComponent(type);
  };

  const onConfirm = (time: string) => {
    setIsVisible(false);
    if (activeComponent === "fromTime") {
      setFromTime(time);
    } else {
      setToTime(time);
    }
  };

  const onAddTimeSlot = () => {
    if (fromTime && toTime && selected) {
      const timeSlot = `${fromTime} - ${toTime}`;
      setTimeSlots((prevTimeSlots) => ({
        ...prevTimeSlots,
        [selected]: [...(prevTimeSlots[selected] || []), timeSlot],
      }));
      // Reset the times
      setFromTime(null);
      setToTime(null);
    }
  };

  return (
    <>
      <Header headerTitle="Lịch làm việc" />
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true },
            }}
          />
        </View>
        <View>
          <Text style={globalStyle.titleText}>
            Chọn giờ:{" "}
            {selected && (
              <Text style={styles.selectedDateText}>{selected}</Text>
            )}
          </Text>
          <View style={styles.timeBoxContainer}>
            <TimeBox
              text={fromTime ? fromTime : "Từ giờ"}
              onPress={() => onPressTimePicker("fromTime")}
            />
            <MaterialCommunityIcons name="arrow-right" size={30} />
            <TimeBox
              text={toTime ? toTime : "Đến giờ"}
              onPress={() => onPressTimePicker("toTime")}
            />
            <ButtonComponent
              buttonText="Thêm"
              onPress={onAddTimeSlot}
              colorButton={globalColor.primaryColor}
              style={{ height: 60, paddingHorizontal: 8 }}
            />
          </View>
          <ScrollView style={styles.timeSlotsContainer}
          nestedScrollEnabled={true}
          >
            {timeSlots[selected]?.map((slot, index) => (
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 40
                }}
              >
                <Text style={styles.timeSlotText}>
                  {slot}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {isVisible && (
        <TimePickerComponent onConfirm={(time) => onConfirm(time)} />
      )}
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  calendar: {
    marginVertical: 12,
  },
  moreContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 40,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "grey",
  },
  timeSlotsContainer: {
    marginVertical: 12,
  },
  dateText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 8,
  },
  timeSlotText: {
    fontSize: 16,
    color: "black",
    marginBottom: 4,
  },
  timeBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
});

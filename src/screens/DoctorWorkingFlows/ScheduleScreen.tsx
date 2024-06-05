import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  FlatList, // Import FlatList
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import CalendarPicker from "react-native-calendar-picker";
import { globalStyle } from "src/constants";
import { Calendar } from "react-native-calendars";
import { Header, TimePickerComponent } from "@/components";

const ScheduleScreen = () => {
  const [selected, setSelected] = useState("");
  const [timeSlots, setTimeSlots] = useState<{ [date: string]: string[] }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<string>();

  const addMoreHandle = () => {
    setIsVisible(!isVisible);
  };

  const onConfirm = (time: string) => {
    setTime(time);
    setIsVisible(false);
    if (selected) {
      setTimeSlots((prevTimeSlots) => ({
        ...prevTimeSlots,
        [selected]: [...(prevTimeSlots[selected] || []), time],
      }));
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
          <Text style={globalStyle.titleText}>Chọn giờ</Text>
          <View style={styles.timeSlotsContainer}>
            {/* Hiển thị danh sách khe giờ */}
            <FlatList
              data={Object.entries(timeSlots)}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.dateText}>{item[0]}</Text>
                  {item[1].map((timeSlot, index) => (
                    <Text key={index} style={styles.timeSlotText}>
                      {timeSlot}
                    </Text>
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <TouchableOpacity
            style={styles.moreContainer}
            onPress={addMoreHandle}
          >
            <Text style={[globalStyle.textNormal, { color: "grey" }]}>
              Thêm khung giờ
            </Text>
          </TouchableOpacity>
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
});

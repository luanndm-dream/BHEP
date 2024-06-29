import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { globalStyle } from "src/constants";
import {
  ButtonComponent,
  ButtonText,
  Header,
  TimePickerComponent,
} from "@/components";
import TimeBox from "./TimeBox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalColor } from "src/constants/color";
import { apiPostSchedule } from "src/api/api_post_Schedule";
import Toast from "react-native-toast-message";
import { useAppSelector } from "@/redux";
import { useNavigation } from "@react-navigation/native";
const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [timeSlots, setTimeSlots] = useState<{ [date: string]: string[] }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [fromTime, setFromTime] = useState<any>();
  const [toTime, setToTime] = useState<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const [activeComponent, setActiveComponent] = useState<String>();

  LocaleConfig.locales["vi"] = {
    monthNames: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    monthNamesShort: [
      "Thg 1",
      "Thg 2",
      "Thg 3",
      "Thg 4",
      "Thg 5",
      "Thg 6",
      "Thg 7",
      "Thg 8",
      "Thg 9",
      "Thg 10",
      "Thg 11",
      "Thg 12",
    ],
    dayNames: [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    today: "Hôm nay",
  };
  LocaleConfig.defaultLocale = "vi";

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
      const timeSlot = `${fromTime}-${toTime}`;
      setTimeSlots((prevTimeSlots) => ({
        ...prevTimeSlots,
        [selected]: [...(prevTimeSlots[selected] || []), timeSlot],
      }));
      // Reset the times
      setFromTime(null);
      setToTime(null);
    }
  };
  const onPressRemove = (index: number) => {
    setTimeSlots((prevTimeSlots) => {
      const updatedSlots = [...(prevTimeSlots[selected] || [])];
      updatedSlots.splice(index, 1);

      // Create a new copy of the object
      const newTimeSlots = { ...prevTimeSlots };

      // If the updatedSlots array is empty, delete the key
      if (updatedSlots.length === 0) {
        delete newTimeSlots[selected];
      } else {
        // Otherwise, update the array for the selected date
        newTimeSlots[selected] = updatedSlots;
      }

      return newTimeSlots;
    });
  };

  const formatDateToDDMMYYYY = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const transformToApiFormat = () => {
    const schedules = Object.keys(timeSlots).map((date) => ({
      date: formatDateToDDMMYYYY(date),
      time: timeSlots[date],
    }));
    console.log(schedules);
    return schedules;
  };

  const updateHandle = () => {
    const data = transformToApiFormat();
    apiPostSchedule(userId, data).then((res: any) => {
      console.log("res", res);
      if (res.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: "Cập nhật thành công",
          // text2: 'Vui lòng kiểm tra tài khoản và mật khẩu'
        });
        navigation.goBack()
      } else {
        Toast.show({
          type: "error",
          text1: "Cập nhật thất bại",
          text2: res.message,
        });
      }
    });
  };

  return (
    <>
      <Header headerTitle="Lịch làm việc" />
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={(day: any) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true },
            }}
            minDate={new Date().toISOString().split("T")[0]}
            monthFormat={"MMMM yyyy"}
          />
        </View>
        <View style={styles.timeSelectionContainer}>
          <Text style={globalStyle.titleText}>
            Chọn giờ:{" "}
            {selected && (
              <Text style={styles.selectedDateText}>
                {formatDateToDDMMYYYY(selected)}
              </Text>
            )}
          </Text>
          {selected ? (
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
          ) : (
            <Text
              style={{
                marginLeft: 6,
                color: "red",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Vui lòng chọn ngày trước
            </Text>
          )}

          <View style={{ height: 170 }}>
            <ScrollView
              style={styles.timeSlotsContainer}
              nestedScrollEnabled={true}
              scrollEnabled={true}
            >
              {timeSlots[selected]?.map((slot, index) => (
                <View
                  key={index}
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    height: 40,
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10, // Adjust margin for better layout
                    flexDirection: "row",
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={styles.timeSlotText}>{slot}</Text>
                  <TouchableOpacity onPress={() => onPressRemove(index)}>
                    <MaterialCommunityIcons
                      name="minus-circle"
                      color={"red"}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonText
              onPress={updateHandle}
              disabled={!selected}
              text="Cập nhật"
              styleContainer={styles.updateButton}
            />
          </View>
        </View>
      </View>
      {isVisible && (
        <TimePickerComponent
          onConfirm={(time) => onConfirm(time)}
          onCancel={() => setIsVisible(false)}
        />
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
    // Correct the typo
    height: 100,
  },
  dateText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 8,
  },
  timeSlotText: {
    fontSize: 18,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
  },
  updateButton: {
    width: "100%",
    height: 60,
    backgroundColor: globalColor.primaryColor,
    borderRadius: 12,
  },
  timeSelectionContainer: {
    flex: 1,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from "src/constants/fontSize";
import { DateSlider, Header, InteractBox } from "@/components";
import FastImage from "react-native-fast-image";
import { InteractData } from "src/data/interactData";
import { globalStyle } from "src/constants";
import moment from "moment";
import { globalColor } from "src/constants/color";
import { apiGetUserById } from "src/api/api_getUserById";
import { apiGetScheduleById } from "src/api/api_get_scheduleById";

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userId = route.params.userId;
  const location = route?.params?.location;
  const [userData, setUserData] = useState<any>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [dateInWeeks, setDateInWeek] = useState<any>();
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>();
  const today = new Date();
  const year = today.getFullYear(); // Lấy năm hiện tại
  const month = today.getMonth(); // Lấy tháng hiện tại (chú ý: từ 0 đến 11)
  const date = today.getDate();
  const [selectedDate, setSelectedDate] = useState<number>(Number(date));
  const [schedules, setSchedules] = useState<any>([]);
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(-1);
  // console.log('location', location)

  const handlePressDateSlider = (index: number, date: number) => {
    setSelectedDateIndex(index);
    setSelectedDate(date);
    setSelectedTimeIndex(-1);

    
    const formattedDate = `${String(date).padStart(2, "0")}-${String(
      month + 1
    ).padStart(2, "0")}-${year}`;
    const scheduleForDate = schedules.find(
      (schedule: any) => schedule.date === formattedDate
    );

    if (scheduleForDate) {
      setSelectedTimes(scheduleForDate.time);
    } else {
      setSelectedTimes([]);
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}`;
  }

  function dates(current: any) {
    var week = [];
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay() + 1);
    for (var i = 0; i < 7; i++) {
      const dayIndex = i === 6 ? 1 : i + 2; // Nếu i là 6 (Chủ Nhật), dayIndex sẽ là 1 (Thứ Hai)
      const formattedDate = formatDate(new Date(current));
      const thu = i === 6 ? "CN" : `T${dayIndex}`;
      const dayObject = {
        id: i + 1,
        date: formattedDate,
        thu: thu,
      };
      week.push(dayObject);
      current.setDate(current.getDate() + 1);

      if (Number(formattedDate) === date) {
        setSelectedDateIndex(i + 1);
      }
    }

    return week;
  }

  const handlePressTimeSlot = (index: number, time: string) => {
    setSelectedTimeIndex(index === selectedTimeIndex ? -1 : index)
    console.log('time', time); // Nếu đã chọn thì hủy chọn, nếu chưa chọn thì chọn
  };

  useEffect(() => {
    apiGetScheduleById(userId).then((res: any) => {
      console.log("schedules", res.data);
      setSchedules(res.data.weekSchedule);
    });

    setDateInWeek(dates(new Date(year, month, date - 1)));
    apiGetUserById(userId).then((res: any) => {
      console.log(res);
      setUserData(res.data);
      setImgUrl(res?.data?.avatar);
    });
  }, []);

  const mapOpen = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = "Custom Label";
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color={"black"}
            />
          </TouchableOpacity>
          {location && (
            <TouchableOpacity style={styles.mapIcon} onPress={() => mapOpen()}>
              <MaterialCommunityIcons
                name="map-marker-account"
                size={40}
                color={"white"}
              />
            </TouchableOpacity>
          )}
          <View style={styles.avatarContainer}>
            <Image
              source={
                imgUrl
                  ? { uri: imgUrl }
                  : require("../../assets/image/manAvatar.png")
              }
              style={styles.avatar}
            />
            <View style={styles.nameBox}>
              <Text style={styles.name}>{userData?.fullName}</Text>
              <Text style={styles.description}>{userData?.description}</Text>
            </View>
          </View>
          <Image
            source={require("../../assets/image/doctorBackground.jpg")}
            style={styles.image}
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <FlatList
              scrollEnabled={false}
              data={InteractData}
              horizontal={true}
              style={styles.interactionBox}
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              renderItem={({ item }) => {
                return (
                  <InteractBox iconName={item.iconName} label={item.label} />
                );
              }}
            />
          </View>
          <View style={styles.scheduleContainer}>
            <View style={{}}>
              <Text style={globalStyle.titleText}>Lịch trình làm việc</Text>
              <FlatList
                scrollEnabled={false}
                //   numColumns={7}
                horizontal={true}
                contentContainerStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
                data={dateInWeeks}
                renderItem={({ item }) => {
                  return (
                    <DateSlider
                      thu={item.thu}
                      date={item.date}
                      onPress={() => handlePressDateSlider(item.id, item.date)}
                      backgroundColor={
                        selectedDateIndex === item.id
                          ? { backgroundColor: globalColor.primaryColor }
                          : undefined
                      }
                    />
                  );
                }}
              />
            </View>
            <Text style={globalStyle.titleText}>Giờ làm việc</Text>
            <FlatList
              data={selectedTimes}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handlePressTimeSlot(index, item)} // Gọi hàm khi khung giờ được chọn
                  style={[
                    styles.timeLabel,
                    {
                      backgroundColor:
                        selectedTimeIndex === index
                          ? globalColor.primaryColor
                          : "white",
                    }, // Thay đổi màu nền dựa trên chỉ số của khung giờ đã chọn
                  ]}
                >
                  <Text style={styles.timeSlotText}>{item}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noScheduleText}>
                  Không có lịch trình cho ngày này
                </Text>
              }
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DoctorDetailScreen;

const styles = StyleSheet.create({
  headerContainer: {
    // height: 200
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: "150%",
    zIndex: 1,
  },
  avatarContainer: {
    zIndex: 2,
    position: "absolute",
    top: "25%",
  },
  scheduleContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    alignSelf: "center",
  },
  interactionBox: {
    marginHorizontal: 16,
    flexDirection: "row",
    marginVertical: 30,
  },
  name: {
    fontSize: globalFontSize.name,
    fontWeight: "bold",
    color: "white",
  },
  nameBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  featureContainer: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 16,
  },
  backIcon: {
    position: "absolute",
    zIndex: 3,
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: globalFontSize.labelName,
    color: "white",
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -40,
    backgroundColor: "#EEEEF0",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "column",
    // paddingHorizontal: 12
  },
  mapIcon: {
    position: "absolute",
    zIndex: 3,
    top: 50,
    right: 20,
  },
  timeSlotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  noScheduleText: {
    fontSize: 16,
    color: "grey",
    paddingVertical: 4,
  },
  timeLabel: {
    height: 40,
    backgroundColor: "white",
    width: 140,
    margin: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

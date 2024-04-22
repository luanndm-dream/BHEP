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

const DoctorDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const userId = route.params.userId;
  const location = route.params.location;
  const userIdFake = 8;
  const [userData, setUserData] = useState<any>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [dateInWeeks, setDateInWeek] = useState<any>();
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>();
  const today = new Date();
  const year = today.getFullYear(); // Lấy năm hiện tại
  const month = today.getMonth(); // Lấy tháng hiện tại (chú ý: từ 0 đến 11)
  const date = today.getDate();
  const [selectedDate, setSelectedDate] = useState<number>(Number(date));

  // console.log('location', location)

  const handlePressDateSlider = (index: number, date: number) => {
    setSelectedDateIndex(index);
    setSelectedDate(date);
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

  useEffect(() => {
    console.log(year, month, date);
    setDateInWeek(dates(new Date(year, month, date - 1)));

    axios
      .get(`https://bhepdemoapi.azurewebsites.net/Api/V1/User/${userIdFake}`)
      .then((res: any) => {
        setUserData(res.data.data);
        setImgUrl(res?.data?.data.avatar);
      });
  }, []);

  const mapOpen = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${location.latitude},${location.longitude}`;
    const label = "Custom Label";
    const url:any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
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
        <TouchableOpacity style={styles.mapIcon} onPress={() => mapOpen()}>
          <MaterialCommunityIcons
            name="map-marker-account"
            size={40}
            color={"white"}
          />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imgUrl}` }}
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
        </View>
      </ScrollView>
    </View>
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
});

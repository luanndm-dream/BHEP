import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { IconFeature, OnPendingScreen } from "@/components";
import { SafeAreaView } from "react-native";
import { globalStyle, STACK_NAVIGATOR_SCREENS } from "src/constants";
import { specialistData } from "@/data";
import { useNavigation } from "@react-navigation/native";
import { apiGetUserByRole } from "src/api/api_get_AllUserByRole";
import ItemDoctor from "./ItemDoctor";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { CARD_DOCTOR_LENGTH, SPACING } from "src/constants/size";
import SuggestDoctorItem from "./SuggestDoctorItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { apiGetDoctors } from "src/api/api_get_Doctor";

const DoctorScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const scrollX = useSharedValue(0);
  const [suggestDoctorData, setSuggestDoctorData] = useState<[any]>();
  console.log(insets.bottom);
  const onPressIconHandle = (name: string) => {
    switch (name) {
      case "Đối tác": {
        navigation.navigate(STACK_NAVIGATOR_SCREENS?.PARTNERSCREEN, {
          // data: dataStation
        });
        break;
      }
      case "Bác sĩ gần chổ tôi": {
        navigation.navigate(
          STACK_NAVIGATOR_SCREENS?.FINDLOCATIONSCREEN as never
        );
        break;
      }
      case "Kiểm tra sức khoẻ": {
        navigation.navigate(STACK_NAVIGATOR_SCREENS?.TRACKINGHEALTHSCREEN, {
          // dataOffice: dataOffice
        });
        break;
      }
    }
  };
  // console.log()

  useEffect(() => {
    apiGetDoctors(5).then((res: any) => {
      console.log("res", res);
      if (res.statusCode === 200) {
        setSuggestDoctorData(res.data.items);
      }
    });
  }, []);

  const data = [
    {
      id: 1,
      name: "Đa khoa",
      imgName: require("../../assets/image/doctor.jpeg"),
    },
    {
      id: 2,
      name: "Tim mạch",
      imgName: require("../../assets/image/doctor.jpeg"),
    },
    {
      id: 3,
      name: "Thần kinh",
      imgName: require("../../assets/image/doctor.jpeg"),
    },
    {
      id: 4,
      name: "Khoa nhi",
      imgName: require("../../assets/image/doctor.jpeg"),
    },
    {
      id: 5,
      name: "Khoa nhi",
      imgName: require("../../assets/image/doctor.jpeg"),
    },
  ];

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onPressDoctorSuggest = (id: number) => {
    console.log("id doctor", id);
    navigation.navigate(STACK_NAVIGATOR_SCREENS?.DOCTORDETAILSCREEN, {
      userId: id,
      // location: location
    });
  };

  return (
    <SafeAreaView style={[globalStyle.droidSafeArea, styles.container]}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={"dark-content"}
      />

      <View style={styles.titleContainer}>
        <Text style={globalStyle.titleText}>Chuyên khoa</Text>
        <Text style={{ color: "grey" }}>Xem thêm</Text>
      </View>
      <View>
        <FlatList
          data={specialistData}
          scrollEnabled={false}
          numColumns={4}
          key={specialistData.length}
          columnWrapperStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <IconFeature
              name={item.name}
              imgUrl={item.imgName}
              onPress={() => onPressIconHandle(item.name)}
            />
          )}
        />
      </View>
      <View>
        <Text style={globalStyle.titleText}>Bác sĩ thịnh hành</Text>
        <View>
          <Animated.FlatList
            data={data}
            renderItem={({ item, index }) => (
              <ItemDoctor
                imgUrl={item.imgName}
                index={index}
                scrollX={scrollX}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={
              Platform.OS === "ios"
                ? CARD_DOCTOR_LENGTH + SPACING * 3.1
                : CARD_DOCTOR_LENGTH + SPACING * 3
            }
            disableIntervalMomentum
            snapToAlignment="center"
            onScroll={scrollHandler}
          />
        </View>
        <View>
          <Text style={[globalStyle.titleText]}>
            Danh sách gợi ý{""}
            <Text style={{ color: "red", textAlign: "center" }}>
              {suggestDoctorData?.length
                ? `(${suggestDoctorData.length})`
                : "0"}
            </Text>
          </Text>
          <View style={{ height: 300 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              // scrollEnabled={true}
              data={suggestDoctorData}
              renderItem={({ item, index }) => (
                <SuggestDoctorItem
                  name={item?.fullName}
                  specialist={item?.description}
                  rate={item?.rate}
                  onPress={() => onPressDoctorSuggest(item.id)}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

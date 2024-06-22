import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  DropDownListWithImage,
  IconFeature,
  OnPendingScreen,
} from "@/components";
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
import useLoading from "src/hook/useLoading";
import { apiGetSpecialist } from "src/api/api_get_Specialist";
import { TouchableOpacity } from "react-native";

const DoctorScreen = () => {
  const { showLoading, hideLoading } = useLoading();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const scrollX = useSharedValue(0);
  const [suggestDoctorData, setSuggestDoctorData] = useState<[any]>();
  const [specialistDataFromApi, setSpecialistDataFromApi] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onPressIconHandle = (screen: string, name: string, id: number) => {
    navigation.navigate(screen, { data: name, id });
  };
  const selectedSpecialistDropDown = (itemId:any, itemName:any) => {
    navigation.navigate('DOCTORSPECIALISTSCREEN', {
      data: itemName,
      itemId,
    });
  };


  useEffect(() => {
    showLoading();
    apiGetSpecialist().then((res: any) => {
      if (res.statusCode === 200) {
        const dataFromApi = res.data.items;
        const mappedSpecialistData = dataFromApi.map((item: any) => {
          let imgName;
          switch (item.name) {
            case "Xương khớp":
              imgName = require("../../assets/icons/joint.png");
              break;
            case "Tim mạch":
              imgName = require("../../assets/icons/cardiology.png");
              break;
            case "Thần kinh":
              imgName = require("../../assets/icons/neurology.png");
              break;
            case "Tai Mũi Họng":
              imgName = require("../../assets/icons/ent.png");
              break;
            case "Răng Hàm Mặt":
              imgName = require("../../assets/icons/dentistry.png");
              break;
            case "Phụ sản":
              imgName = require("../../assets/icons/obstetrics.png");
              break;
            case "Nội Khoa":
              imgName = require("../../assets/icons/internal.png");
              break;
            case "Ký sinh trùng":
              imgName = require("../../assets/icons/parasite.png");
              break;
            case "Hô Hấp":
              imgName = require("../../assets/icons/respiratory.png");
              break;
            case "Dinh dưỡng":
              imgName = require("../../assets/icons/nutrition.png");
              break;
            default:
              imgName = require("../../assets/icons/default.png");
              break;
          }
          return {
            id: item.id,
            name: item.name,
            img: imgName,
            screen: STACK_NAVIGATOR_SCREENS.DOCTORSPECIALISTSCREEN,
          };
        });
        setSpecialistDataFromApi(mappedSpecialistData);
      }
    });

    apiGetDoctors(5).then((res: any) => {
      if (res.statusCode === 200) {
        hideLoading();
        setSuggestDoctorData(res.data.items);
      }
    });
  }, []);

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
    <>
      <SafeAreaView style={[globalStyle.droidSafeArea, styles.container]}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle={"dark-content"}
        />

        <View style={styles.titleContainer}>
          <Text style={globalStyle.titleText}>Chuyên khoa</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Text style={{ color: "grey" }}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={specialistDataFromApi.slice(0, 4)}
            scrollEnabled={false}
            numColumns={4}
            key={specialistData.length}
            columnWrapperStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            renderItem={({ item }: any) => (
              <IconFeature
                name={item.name}
                imgUrl={item.imgName}
                onPress={() =>
                  onPressIconHandle(item.screen, item.name, item.id)
                }
              />
            )}
          />
        </View>
        <View>
          <Text style={globalStyle.titleText}>Bác sĩ thịnh hành</Text>
          <View>
            <Animated.FlatList
              data={suggestDoctorData}
              renderItem={({ item, index }) => (
                <ItemDoctor
                  onPress={() => onPressDoctorSuggest(item.id)}
                  imgUrl={item?.avatar}
                  index={index}
                  rate={item?.rate}
                  fullName={item?.fullName}
                  specialistId={item?.specialistId}
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
        </View>
        <View style={{ flex: 1, marginBottom: 40 }}>
          <Text style={[globalStyle.titleText]}>
            Danh sách gợi ý
            <Text style={{ color: "red", textAlign: "center" }}>
              {suggestDoctorData?.length
                ? `(${suggestDoctorData.length})`
                : "0"}
            </Text>
          </Text>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              // scrollEnabled={true}
              data={suggestDoctorData}
              renderItem={({ item, index }) => (
                <SuggestDoctorItem
                  name={item?.fullName}
                  image={item?.avatar}
                  specialist={item?.description}
                  rate={item?.rate}
                  onPress={() => onPressDoctorSuggest(item.id)}
                />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
      {isOpen && (
        <DropDownListWithImage
          onCancel={() => setIsOpen(false)}
          visible={isOpen}
          dataList={specialistDataFromApi}
          onSelectItem={selectedSpecialistDropDown}
        />
      )}
    </>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

import { Platform, StyleSheet, SafeAreaView, View } from "react-native";
import { ButtonText, Header, NearByDoctorCard } from "@/components";
import { globalColor } from "src/constants/color";
import React, { useEffect, useState } from "react";
import Geolocation, { watchPosition } from "react-native-geolocation-service";
import {
  distanceBetween,
  geohashForLocation,
  geohashQueryBounds,
  Geopoint,
} from "geofire-common";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

import {
  endAt,
  get,
  orderByChild,
  query,
  ref,
  startAt,
  update,
} from "firebase/database";
import { db } from "@/services";
import { useAppSelector } from "@/redux";
import { FlatList } from "react-native-gesture-handler";
import { globalStyle } from "src/constants";
const FindLocationScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [permission, setPermission] = useState(false);
  const [dataMatch, setDataMatch] = useState<any[]>([]);
  const user = Platform.OS == "ios" ? "user1" : "user2";
  const roleId = Platform.OS == "ios" ? 3 : 1;
  const fullName = Platform.OS == "ios" ? "Nguyễn Bác Sĩ" : "Customer";
  const major = Platform.OS == "ios" ? "Tim mạch" : "Không có";
  const userData = useAppSelector((state) => state.user.userData);
  const fakeLocation = () => {
    const latitude = location.latitude;
    const longitude = location.longitude;
    const hash = geohashForLocation([latitude, longitude]);
    try {
      update(ref(db, "users/" + user), {
        geohash: hash,
        fullName: fullName,
        major: major,
        userId: user,
        roleId: roleId,
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {}
  };

  const getData = async () => {
    const center: Geopoint = [location.latitude, location.longitude];
    const radiusInM = 5 * 10000; // 5km
    const bounds = geohashQueryBounds(center, radiusInM);

    const promises = [];
    try {
      for (const b of bounds) {
        const q = query(
          ref(db, "users"),
          orderByChild("geohash"),
          startAt(b[0]),
          endAt(b[1])
        );

        promises.push(await get(q));
      }
    } catch (error) {
      console.log("Lôi", error);
    }

    const snapshots = await Promise.all(promises);

    const arrs: any = [];

    snapshots.map((element) => {
      if (element.val() !== null) {
        arrs.push(element.val());
      }
    });

    const filteredMatchingDocs = [];
    for (const obj of arrs) {
      for (const key in obj) {
        const element = obj[key];
        if (element.userId !== user) {
          const latitude = element.latitude;
          const longitude = element.longitude;
          const distanceInKm = distanceBetween([latitude, longitude], center);
          const distanceInM = distanceInKm * 1000;
          // if (distanceInM <= radiusInM && element.roleId === 3) {
          if (distanceInM <= radiusInM) {
            filteredMatchingDocs.push(element);
          }
        }
      }
    }
    setDataMatch(filteredMatchingDocs);

    console.log("arrs", dataMatch);
  };
  useEffect(() => {
    location && setTimeout(() => getData(), 3000);
  }, [location]);

  useEffect(() => {
    location && fakeLocation();
  }, [location]);

  const onFindingHandle = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const result = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(result);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestPermissions();
  }, []);
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const locationPermissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (locationPermissionStatus === RESULTS.GRANTED) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } else {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        if (result === RESULTS.GRANTED) {
          setPermission(true);
        } else {
          setPermission(false);
        }
      });
    }
  };

  // const checkPermissions = async () => {
  //   if (permission!= true) {
  //     requestPermissions();
  //   } else {
  //     setPermission(true);
  //   }
  // };

  return (
    <>
      <Header headerTitle="Bác sĩ gần đây" />
      <View style={{ flex: 2, marginHorizontal: 12 }}>
        <ButtonText
          text="Tìm kiếm"
          onPress={onFindingHandle}
          styleContainer={{
            marginTop: 30,
            width: "100%",
            height: 60,
            borderRadius: 12,
            backgroundColor: globalColor.primaryColor,
          }}
          styleText={{ color: "white" }}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatlistContainer}
          data={dataMatch}
          renderItem={({ item }) => {
            return (
              <NearByDoctorCard
                fullName={item.fullName}
                major={item.major}
                lat={item.latitude}
                lng={item.longitude}
                onPress={() => console.log("di chuyển sang màn hình detail")}
              />
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default FindLocationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 9,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  flatlistContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12
  },
});
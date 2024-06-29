import React, { useEffect, useState, useRef } from "react";
import { onValue, ref } from "firebase/database";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header } from "@/components";
import PulseIndicator from "./PulseIndicator"; // Import PulseIndicator từ PulseIndicator.tsx
import { realtimeDb } from "src/services/firebase-iot";
import { globalColor } from "src/constants/color";
import { useAppSelector } from "@/redux";
import { apiGetUserById } from "src/api/api_getUserById";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

export interface DeviceData {
  HeartBeat: number;
  SpO2: number;
  Temperature: number;
}

const TrackingHealthScreen = () => {
  const navigation = useNavigation<any>();
  const userId = useAppSelector((state) => state.user.userData.id);
  const [data, setData] = useState<DeviceData | null>(null);
  const previousDataRef = useRef<DeviceData | null>(null);
  const [isDataNew, setIsDataNew] = useState<boolean>(false);
  const isFirstFetchRef = useRef<boolean>(true);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const [user, setUser] = useState<any>();

  useEffect(() => {
    apiGetUserById(userId).then((res: any) => {
      if (res.statusCode === 200) {
        setUser(res.data);
      }
    });
  }, [userId]);

  useEffect(() => {
    const query = ref(realtimeDb, "Device1");

    const unsubscribe = onValue(query, (snapshot) => {
      const dataSnap = snapshot.val();

      if (snapshot.exists() && dataSnap) {
        if (isFirstFetchRef.current) {
          setData(dataSnap);
          previousDataRef.current = dataSnap;
          setIsDataNew(true);
          isFirstFetchRef.current = false;
        } else if (!compareData(previousDataRef.current!, dataSnap)) {
          setData(dataSnap);
          previousDataRef.current = dataSnap;
          setIsDataNew(true);
        }
        lastUpdateTimeRef.current = Date.now();
      } else {
        setData(null);
        previousDataRef.current = null;
        setIsDataNew(false);
        isFirstFetchRef.current = true;
      }
    });

    // Set up a timer to check for updates every 5 seconds
    const timer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastUpdateTimeRef.current > 5000) {
        setIsDataNew(false);
      }
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const compareData = (prevData: DeviceData, newData: DeviceData) => {
    return (
      prevData.HeartBeat === newData.HeartBeat &&
      prevData.SpO2 === newData.SpO2 &&
      prevData.Temperature === newData.Temperature
    );
  };
  const roundToThreeDecimalPlaces = (number: number | undefined) => {
    if (number !== undefined) {
      return Number(number.toFixed(3));
    }
    return "N/A"; // or any default value you want to return
  };

  return (
    <>
    <Header headerTitle="Kiểm tra sức khoẻ" />
    <View style={styles.container}>
    
      {user?.deviceCodes ? (
        <View style={styles.content}>
          <PulseIndicator isDataNew={isDataNew} />
          {!isDataNew ? (
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>
                Giữ tay của bạn vào vị trí kiểm tra
              </Text>
            </View>
          ) : null}
          <View style={styles.dataContainer}>
            <View style={styles.dataRow}>
              <Text style={styles.labelText}>Nhịp tim</Text>
              <Text style={styles.dataText}>{roundToThreeDecimalPlaces(data?.HeartBeat) ?? "N/A"}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.labelText}>Nồng độ Oxy</Text>
              <Text style={styles.dataText}>{roundToThreeDecimalPlaces(data?.SpO2) ?? "N/A"}</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.labelText}>Nhiệt độ</Text>
              <Text style={styles.dataText}>{roundToThreeDecimalPlaces(data?.Temperature) ?? "N/A"}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ width: "80%" }}>
            <TouchableOpacity onPress={()=>navigation.navigate(STACK_NAVIGATOR_SCREENS.SERVICESCREEN)}>
              <Text style={{ textAlign: "center", color: globalColor.primaryColor, fontSize: 16, fontWeight: 'bold' }}>
                Chức năng yêu cầu người dùng phải có thiết bị. Vui lòng xem thêm
                tại đây.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    position: 'absolute',
    bottom: 0
  },
  dataRow: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  labelText: {
    fontSize: 18,
    color: "#555",
    marginRight: 10,
  },
  dataText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
    marginVertical: 5,
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    width: '100%',
  },
  alertText: {
    fontSize: 20,
    color: globalColor.secondaryColor,
    fontWeight: "bold",
    marginBottom: 16,
  },
  noDeviceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDeviceText: {
    textAlign: "center",
    color: globalColor.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TrackingHealthScreen;

import React, { useEffect, useState, useRef } from "react";
import { onValue, ref } from "firebase/database";
import { StyleSheet, View, Text } from "react-native";
import { Header } from "@/components";
import PulseIndicator from "./PulseIndicator"; // Import PulseIndicator từ PulseIndicator.tsx
import { realtimeDb } from "src/services/firebase-iot";
import { globalColor } from "src/constants/color";

export interface DeviceData {
  HeartBeat: number;
  SpO2: number;
  Temperature: number;
}

const TrackingHealthScreen = () => {
  const [data, setData] = useState<DeviceData | null>(null);
  const previousDataRef = useRef<DeviceData | null>(null);
  const [isDataNew, setIsDataNew] = useState<boolean>(false);
  const isFirstFetchRef = useRef<boolean>(true);
  const lastUpdateTimeRef = useRef<number>(Date.now());

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

    // Set up a timer to check for updates every 2 seconds
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

  console.log("isDataNew:", isDataNew);
  console.log("Current data:", data);

  return (
    <View style={styles.container}>
      <Header headerTitle="Kiểm tra sức khoẻ" />
      <View style={styles.content}>
        <PulseIndicator isDataNew={isDataNew} />
      </View>
      {!isDataNew ? (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>
            Giữ tay của bạn vào vị trí kiểm tra
          </Text>
        </View>
      ): null}
      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Text style={styles.labelText}>Nhịp tim</Text>
          <Text style={styles.dataText}>{data?.HeartBeat ?? "N/A"}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.labelText}>Nồng độ Oxy</Text>
          <Text style={styles.dataText}>{data?.SpO2 ?? "N/A"}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.labelText}>Nhiệt độ</Text>
          <Text style={styles.dataText}>{data?.Temperature ?? "N/A"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    // flex: 2,
    justifyContent: "center",
    // backgroundColor: 'green',
    height: 400,
  },
  dataContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
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
  arlet: {
    textAlign: "center",
    width: 150,
    alignItems: "center",
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  alertText: {
    fontSize: 20,
    color: globalColor.secondaryColor,
    fontWeight:'bold',
    marginBottom: 16
  },
});

export default TrackingHealthScreen;

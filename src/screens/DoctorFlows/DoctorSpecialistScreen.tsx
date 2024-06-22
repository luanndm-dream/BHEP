import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "@/components";
import { apiGetDoctorsWithSpecialistId } from "src/api/api_get_Doctor";
import SuggestDoctorItem from "./SuggestDoctorItem";
import useLoading from "src/hook/useLoading";

const DoctorSpecialistScreen = () => {
  const route = useRoute<any>();
  const nameHeader = route.params.data;
  const specialistId = route.params.id;
  const navigation = useNavigation<any>();
  const { showLoading, hideLoading } = useLoading();
  const [doctor, setDoctor] = useState<any[]>([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    showLoading();
    apiGetDoctorsWithSpecialistId(specialistId).then((res: any) => {
      if (res.statusCode === 200) {
        setDoctor(res.data.items);
        hideLoading();
        setIsLoading(false);
      } else {
        hideLoading();
      }
    });
  }, []);

  // Render function when there are no doctors
  const renderNoDoctors = () => {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDoctorText}>
          Hiện đang không có bác sĩ ngành {nameHeader}
        </Text>
      </View>
    );
  };

  // Render loading indicator
  return (
    <>
      <Header headerTitle={nameHeader} />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View />
        ) : doctor.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={doctor}
            renderItem={({ item, index }) => (
              <SuggestDoctorItem
                name={item?.fullName}
                onPress={() => {}}
                specialist={nameHeader}
                image={item?.avatar}
                rate={item?.rate}
              />
            )}
          />
        ) : (
          renderNoDoctors() // Show no doctors message if no doctors found
        )}
      </SafeAreaView>
    </>
  );
};

export default DoctorSpecialistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDoctorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
});

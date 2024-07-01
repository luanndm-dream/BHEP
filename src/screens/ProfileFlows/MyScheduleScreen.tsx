import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux";
import { apiGetUserById } from "src/api/api_getUserById";
import { Header } from "@/components";
import useLoading from "src/hook/useLoading";
import ScheduleItem from "./ScheduleItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

const MySchedule = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const navigation = useNavigation<any>()
  const { showLoading, hideLoading } = useLoading();
  const [appointment, setAppointment] = useState<any[]>([]);

  
  const loadAppointments = useCallback(() => {
    showLoading();
    apiGetUserById(userData.id).then((res: any) => {
      if (res.statusCode === 200) {
        setAppointment(userData.roleId === 3 ? res?.data?.appointmentsReceived : res?.data?.appointments);
      }
      hideLoading();
    });
  }, [userData.id]);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [loadAppointments])
  );


  const onPressItemHandle = (id: number,index: number) => {
    console.log('id',id)
    navigation.navigate(STACK_NAVIGATOR_SCREENS.APPOINTMENTDETAILSCREEN, {
      id: id,
      data: appointment[index]
    })
  }
  return (
    <>
      <Header headerTitle="Lịch hẹn của tôi" />
      <SafeAreaView style={styles.container}>
        <FlatList data={appointment} renderItem={({item,index})=>{
          return (
            <ScheduleItem date={item?.date} status={item?.status} 
            name={userData.roleId === 2? item.employeeName : item.customerName}
            image={userData.roleId === 2? item.employeeAvatar : item.customerAvatar}
            time={item.time}
            onPress={()=>onPressItemHandle(item.id, index)}
            />
          )
        }}/>
      </SafeAreaView>
    </>
  );
};

export default MySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

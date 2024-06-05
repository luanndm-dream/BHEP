import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, OnPendingScreen, WorkspaceDoctorItemCard } from "@/components";
import { WorkSpaceDoctorData } from "src/data/workspaceDoctorData";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";

const WorkSpaceDoctorScreen = () => {
  const navigation = useNavigation<any>();
  const onPressIconHandle = (name: string) => {
    navigation.navigate(name)
  };

  return (
    <>
      <Header headerTitle="Làm việc" />
      <View>
        <FlatList
          data={WorkSpaceDoctorData}
          renderItem={({ item }) => {
            return (
              <WorkspaceDoctorItemCard
                imgUrl={item.imgIcon}
                label={item.name}
                iconLastName={item.iconLastName}
                onPress={() => onPressIconHandle(item.screen)}
              />
            );
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 24, color: "red" }}>
          Tính năng đang được cập nhật
        </Text>
        <View style={{ marginTop: 100 }}>
          <OnPendingScreen />
        </View>
      </View>
    </>
  );
};

export default WorkSpaceDoctorScreen;

const styles = StyleSheet.create({});

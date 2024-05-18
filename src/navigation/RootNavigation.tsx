import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import {
  CommunityScreen,
  DoctorDetailScreen,
  DoctorScreen,
  FindLocationScreen,
  HomeScreen,
  InformationScreen,
  LoginScreen,
  MatchLocationScreen,
  MyHealthScreen,
  OnBoardingScreen,
  PartnerScreen,
  ProfileScreen,
  QuestionnaireScreen,
  RegisterScreen,
  SplashScreen,
  TrackingHealthScreen,
  WorkSpaceDoctorScreen,
} from "@/screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/redux";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import userSlice, { setUserInfo } from "src/redux/slice/userSlice";

const myNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    notification: "rgba(255, 255, 255, 0.5)",
    secondaryContainer: "transparent",
  },
};
const Stack = createStackNavigator();
const Bottom = createMaterialBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <>
      <Bottom.Navigator
        activeColor="#0A5BF1"
        barStyle={{ backgroundColor: "transparent", paddingBottom: 0 }}
      >
        <Bottom.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Bottom.Screen
          name="CommunityScreen"
          component={CommunityScreen}
          options={{
            tabBarLabel: "Cộng đồng",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Bottom.Screen
          name="DoctorScreen"
          component={DoctorScreen}
          options={{
            tabBarLabel: "Bác sĩ",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="doctor" color={color} size={26} />
            ),
          }}
        />
        <Bottom.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Cá nhân",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Bottom.Navigator>
    </>
  );
};
// const Screens = () =>{
//     <Stack.Navigator>
//         <Stack.Screen name="PartnerScreen" component={PartnerScreen} />
//     </Stack.Navigator>
// }
const RootNavigation = () => {
  const dispatch = useAppDispatch();
  const [isShowSplash, setIsShowPlash] = useState<boolean>(true);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  console.log("accessToken", accessToken);

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(()=>{
      setIsShowPlash(false)
    },1500)
  }, [accessToken]);

  const { getItem } = useAsyncStorage("auth");
  const checkLogin = async () => {
    const res: any = await getItem();
    console.log("token", res);
    res && dispatch(setUserInfo(JSON.parse(res)));
  };

  const authScreens = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
      />
    </Stack.Navigator>
  );

  const mainScreens = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainFlows" component={BottomTabNavigation} />
      <Stack.Screen name="PartnerScreen" component={PartnerScreen} />
      <Stack.Screen name="FindLocationScreen" component={FindLocationScreen} />
      <Stack.Screen
        name="MatchLocationScreen"
        component={MatchLocationScreen}
      />
      <Stack.Screen name="InformationScreen" component={InformationScreen} />
      <Stack.Screen
        name="WorkSpaceDoctorScreen"
        component={WorkSpaceDoctorScreen}
      />
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />

      <Stack.Screen name="MyHealthScreen" component={MyHealthScreen} />
      <Stack.Screen
        name="TrackingHealthScreen"
        component={TrackingHealthScreen}
      />
    </Stack.Navigator>
  );

  return (
    <PaperProvider theme={myNavigationTheme}>
      <NavigationContainer>
         {/* <SplashScreen /> */}
        {isShowSplash ? (
          <SplashScreen />
        ) : accessToken == null ? (
          authScreens
        ) : (
          mainScreens
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});

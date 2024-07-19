import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
// import { withIAPContext } from "react-native-iap";
import {
  AppointmentDetailScreen,
  AppointmentScreen,
  BMICalculatorScreen,
  BMIResultScreen,
  ChangePasswordScreen,
  CoinTransactionDetailScreen,
  CommunityScreen,
  DisableAccountScreen,
  DoctorDetailScreen,
  DoctorScreen,
  DoctorSpecialistScreen,
  EditWorkProfileScreen,
  FindLocationScreen,
  HealthRecordScreen,
  HistoryTransactionScreen,
  HomeScreen,
  InformationScreen,
  LoginScreen,
  MatchLocationScreen,
  MyHealthScreen,
  MyScheduleScreen,
  OnBoardingScreen,
  PartnerScreen,
  PaymentScreen,
  PolicyScreen,
  ProductDetailScreen,
  ProductScreen,
  ProfileScreen,
  QuestionnaireScreen,
  RatingScreen,
  RegisterScreen,
  ScheduleScreen,
  ServiceDetailScreen,
  ServiceScreen,
  SplashScreen,
  SubscriptionScreen,
  TestScreen,
  TrackingHealthScreen,
  WebViewScreen,
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
import {
  BOTTOM_NAVIGATOR_SCREENS,
  STACK_NAVIGATOR_SCREENS,
} from "src/constants";
import NotificationScreen from "src/screens/HomeFlows/NotificationScreen";
import AboutUsScreen from "src/screens/ProfileFlows/AboutUsScreen";

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
    <Bottom.Navigator
      activeColor="#0A5BF1"
      barStyle={{ backgroundColor: "white", paddingBottom: 0 }}
    >
      <Bottom.Screen
        name={BOTTOM_NAVIGATOR_SCREENS?.HOMESCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Bottom.Screen
        name={BOTTOM_NAVIGATOR_SCREENS?.COMMUNITYSCREEN}
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
        name={BOTTOM_NAVIGATOR_SCREENS?.DOCTORSCREEN}
        component={DoctorScreen}
        options={{
          tabBarLabel: "Bác sĩ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={26} />
          ),
        }}
      />
      <Bottom.Screen
        name={BOTTOM_NAVIGATOR_SCREENS?.PROFILESCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const RootNavigation = () => {
  const dispatch = useAppDispatch();
  const [isShowSplash, setIsShowPlash] = useState<boolean>(
    useAppSelector((state) => state.user.isSplash)
  );
  const [isChecking, setIsChecking] = useState<boolean>(
    useAppSelector((state) => state.userHealthRecord.isChecking)
  );

  const accessToken = useAppSelector((state) => state.user.accessToken);

  const initialRouteName =
    isChecking === false
      ? STACK_NAVIGATOR_SCREENS.QUESTIONNAIRESCREEN
      : STACK_NAVIGATOR_SCREENS.MAINFLOWS;

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowPlash(false);
    }, 1500);
  }, [accessToken]);

  const { getItem } = useAsyncStorage("auth");
  const checkLogin = async () => {
    const res: any = await getItem();
    res && dispatch(setUserInfo(JSON.parse(res)));
  };

  const authScreens = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS.ONBOARDINGSCREEN}
        component={OnBoardingScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.LOGINSCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.REGISTERSCREEN}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );

  const mainScreens = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.QUESTIONNAIRESCREEN}
        component={QuestionnaireScreen}
      />

      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.MAINFLOWS}
        component={BottomTabNavigation}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.PARTNERSCREEN}
        component={PartnerScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.FINDLOCATIONSCREEN}
        component={FindLocationScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.MATCHLOCATIONSCREEN}
        component={MatchLocationScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.INFORMATIONSCREEN}
        component={InformationScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.WORKSPACEDOCTORSCREEN}
        component={WorkSpaceDoctorScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.DOCTORDETAILSCREEN}
        component={DoctorDetailScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.DOCTORSPECIALISTSCREEN}
        component={DoctorSpecialistScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.MYHEALTHSCREEN}
        component={MyHealthScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.EDITWORKPROFILESCREEN}
        component={EditWorkProfileScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.TRACKINGHEALTHSCREEN}
        component={TrackingHealthScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.SCHEDULESCREEN}
        component={ScheduleScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.APPOINTMENTSCREEN}
        component={AppointmentScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.APPOINTMENTDETAILSCREEN}
        component={AppointmentDetailScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.MYSCHEDULESCREEN}
        component={MyScheduleScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.PAYMENTSCREEN}
        component={PaymentScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.WEBVIEWSCREEN}
        component={WebViewScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.SERVICESCREEN}
        component={ServiceScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.PRODUCTSCREEN}
        component={ProductScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.PRODUCTDETAILSCREEN}
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.SERVICEDETAILSCREEN}
        component={ServiceDetailScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.CHANGEPASSWORDSCREEN}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.NOTIFICATIONSCREEN}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.HISTORYTRANSACTIONSCREEN}
        component={HistoryTransactionScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.POLICYSCREEN}
        component={PolicyScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.ABOUTUSSCREEN}
        component={AboutUsScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.COINTRANSACTIONDETAIL}
        component={CoinTransactionDetailScreen}
      />
       <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.RATINGSCREEN}
        component={RatingScreen}
      />
       <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.DISABLEACCOUNTSCREEN}
        component={DisableAccountScreen}
      />
       {/* <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.SUBCRIPTIONSCREEN}
        component={withIAPContext(SubscriptionScreen)}
      /> */}
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.BMICALCULATORSCREEN}
        component={BMICalculatorScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.BMIRESULTSCREEN}
        component={BMIResultScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATOR_SCREENS?.HEALTHRECORDSCREEN}
        component={HealthRecordScreen}
      />
    </Stack.Navigator>
  );

  return (
    <PaperProvider theme={myNavigationTheme}>
      <NavigationContainer>
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

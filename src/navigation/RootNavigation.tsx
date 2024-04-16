import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { CommunityScreen, DoctorScreen, HomeScreen, LoginScreen, ProfileScreen } from '@/screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const myNavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      notification: 'rgba(255, 255, 255, 0.5)',
      secondaryContainer: 'transparent',
    },
  };

const BottomTabNavigation = () => {
    const Bottom = createMaterialBottomTabNavigator()

    return ( 
        <Bottom.Navigator
        activeColor="#0A5BF1"
       
        barStyle={{backgroundColor: '#FFFFFF', paddingBottom: 0}}
        >
            <Bottom.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Trang chủ',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='CommunityScreen'
            component={CommunityScreen}
            options={{
                tabBarLabel: 'Cộng đồng',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account-group" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='DoctorScreen'
            component={DoctorScreen}
            options={{
                tabBarLabel: 'Bác sĩ',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="doctor" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Cá nhân',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                )
            }}
            />
        </Bottom.Navigator>
    )
}


const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <PaperProvider theme={myNavigationTheme}>
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name='MainFlows' component={BottomTabNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { CommunityScreen, DoctorScreen, HomeScreen, LoginScreen, ProfileScreen } from '@/screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTabNavigation = () => {
    const Bottom = createMaterialBottomTabNavigator()

    return (
        <Bottom.Navigator>
            <Bottom.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='CommunityScreen'
            component={CommunityScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='DoctorScreen'
            component={DoctorScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                )
            }}
            />
            <Bottom.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                )
            }}
            />
        </Bottom.Navigator>
    )
}


const Stack = createStackNavigator();
const RootNavigation = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen name='LoginScreen' component={BottomTabNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})
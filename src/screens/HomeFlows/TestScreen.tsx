import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { ButtonText, Header } from '@/components';
import { BleManager, Device } from 'react-native-ble-plx';
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import {btoa, atob} from 'react-native-quick-base64'
const TestScreen = () => {
  // const SERVICES_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
  const SERVICES_UUID = 'C7C6D386-BB8A-9C05-80B0-F89606FF7BA4'
  const STEP_DATA_CHAR_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd'
  const bleManager = new BleManager();
  // const device = bleManager.devices
  const [devices, setDevices] = useState([]);
  const [deviceID, setDeviceID] = useState(null);
  const [stepCount, setStepCount] = useState(40);
  const deviceRef = useRef(null)
  const [connectionStatus, setConnectionStatus] = useState<string>('Searching...');
  const [stepDataChar,setStepDataChar] = useState()
  const [permission, setPermission] = useState(false);
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const locationPermissionStatus = await request(
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      );
      if (locationPermissionStatus === RESULTS.GRANTED) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } else {
      request(PERMISSIONS.IOS.BLUETOOTH).then((result) => {
        if (result === RESULTS.GRANTED) {
          setPermission(true);
        } else {
          setPermission(false);
        }
      });
    }
  };

  const searchDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device)=> {
      if(error){
        console.error(error)
        setConnectionStatus('Error searching devices')
        return;
      }
      if(device){
        bleManager.stopDeviceScan()
        setConnectionStatus('Connecting...')
        connectToDevice(device)
      } 
    })
  }

  const connectToDevice = (device:any)=> {
    return device.connect().then((device: any)=>{
      setDeviceID(device.id);
      setConnectionStatus('Connected')
      deviceRef.current = device;
      return device.discoverAllServicesAndCharacteristics();
    })
    .then((device:any)=>{
      return device.service();
    })
    .then((services:any)=>{
      let service = services.find((service:any)=>service.uuid === SERVICES_UUID);
      return service.characteristics();
    })
    .then((characteristics: any)=>{
      let stepDataCharacteristic = characteristics.find((char:any)=>char.uuid= STEP_DATA_CHAR_UUID);
      setStepDataChar(stepDataCharacteristic)
      stepDataCharacteristic.monitor((error:any, char:any)=>{
        if(error){
          console.error(error)
          return
        }
        const rawStepData = atob(char.value);
        console.log('received data', rawStepData)
        setStepCount(Number(rawStepData))
      })
    })
    .catch((error: any)=>{
      console.log(error)
      setConnectionStatus('Error in connect devices')
    })
  } 

  useEffect(()=>{
    requestPermissions()
  },[])
 

  return (
    <>
      <Header headerTitle='Bluetooth Test' />
      <SafeAreaView style={styles.container}>
        <Text>Scanning for Bluetooth devices...</Text>
        <Text>{stepCount}</Text>
        <ButtonText onPress={searchDevices} text='Searching'/>
      </SafeAreaView>
    </>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  deviceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceText: {
    fontSize: 16,
  },
});

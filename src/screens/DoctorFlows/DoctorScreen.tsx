import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnPendingScreen } from '@/components'

const DoctorScreen = () => {
  return (
    <>
    <StatusBar backgroundColor='transparent' translucent barStyle={"dark-content"}/>
    <OnPendingScreen/>
    </>

  )
}

export default DoctorScreen

const styles = StyleSheet.create({})
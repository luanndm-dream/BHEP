import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnPendingScreen } from '@/components'
import { StatusBar } from 'react-native'

const CommunityScreen = () => {
  return (
    <>
    <StatusBar backgroundColor='transparent' translucent barStyle={"dark-content"}/>
    <OnPendingScreen/>
    </>
  )
}

export default CommunityScreen

const styles = StyleSheet.create({})
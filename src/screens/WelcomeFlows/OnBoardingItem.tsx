import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View, SafeAreaView} from 'react-native'
import React from 'react'

import { globalColor } from 'src/constants/color'
interface OnBoardingItemProps {
    item: any
}
const OnBoardingItem:React.FC<OnBoardingItemProps> = ({item}) => {
    const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={[styles.container, {width}]}>
            <Image source={item.img} style={[styles.image, {width, resizeMode: 'contain'}]}/>
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
    </SafeAreaView>
  )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        flex: 0.7,
        justifyContent: 'center'
    },
    content: {
        flex: 0.3,
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: globalColor.primaryColor,
        textAlign: 'center',
        paddingHorizontal: 12
    },
    description: {
        fontWeight: '300',
        color: '#616161',
        textAlign: 'center',
        paddingHorizontal: 64
    }
})
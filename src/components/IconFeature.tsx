import React from 'react';
import { View, Text, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import { globalColor } from 'src/constants/color';

interface IconFeatureProps {
    name: string | any;
    imgUrl: string | any;
    onPress?: ()=> any;
    // onPress?: (event: GestureResponderEvent) => void | undefined
  }
  

const IconFeature:React.FC<IconFeatureProps> = ({name, imgUrl, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={imgUrl} style={styles.image} resizeMode='contain'/>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
      );
}

export default IconFeature

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // width: 80,
        // height: 80
        },
        iconContainer: {
          backgroundColor: '#E0F4F9',
          borderRadius: 35,
          
        },
        image: {
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'white',
          alignSelf: 'center'
        },
        name: {
          fontSize: 14,
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center',
        },
})
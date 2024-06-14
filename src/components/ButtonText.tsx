import { Button, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import { TextStyle } from 'react-native';

interface ButtonTextProps {
    text?: string,
    onPress: () => void,
    styleContainer?: StyleProp<ViewStyle>,
    styleText?: StyleProp<TextStyle>,
    disabled?: boolean
}

const ButtonText: React.FC<ButtonTextProps> = ({ text, onPress, styleContainer, styleText, disabled }) => {
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[
                styles.container,
                styleContainer,
                disabled ? styles.disabledContainer : {}
            ]}
            disabled={disabled}
        >
            <Text style={[styles.text, styleText]}>{text}</Text>
        </TouchableOpacity>
    );
}

export default ButtonText;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    disabledContainer: {
        backgroundColor: 'grey' // Change this to whatever color you want when the button is disabled
    }
});

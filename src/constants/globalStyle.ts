import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    textNormal: {
        fontSize: 18,
        color: 'black'
    }
});
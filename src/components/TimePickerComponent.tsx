import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, { useRef } from 'react';
  import WheelPicker from './WheelPicker';
  import CustomModal from './CustomModal';
  import ButtonComponent from './ButtonComponent';
  
  interface TimePickerProps {
    value?: any;
    defaultValue?: any;
    onConfirm: (time: string) => void;
    onCancel?: () => void;
    visible?: boolean;
  }
  
  const TimePickerComponent: React.FC<TimePickerProps> = ({
    value,
    defaultValue,
    onConfirm,
    onCancel,
    visible,
  }) => {
  
    const hours = () => {
      let data = [];
      for (let i = 0; i < 24; i++) {
        const formattedHour = i < 10 ? `0${i}` : `${i}`;
        data.push({
          label: formattedHour,
          value: formattedHour,
        });
      }
      return data;
    };
  
    const minutes = () => {
      let data = [];
      for (let i = 0; i < 60; i++) {
        const formattedMinute = i < 10 ? `0${i}` : `${i}`;
        data.push({
          label: formattedMinute,
          value: formattedMinute,
        });
      }
      return data;
    };
  
    const hourRef: any = useRef("00");
    const minuteRef: any = useRef("00");
    
    const onHourChange = (value: string, index?: number) => {
        hourRef.current = value.toString();
      };  
      const onMinuteChange = (value: string, index?: number) => {
        minuteRef.current = value.toString();
      };  
    return (
      <CustomModal
        onBackDropPress={() => {
          onCancel?.();
        }}
        visible={visible}
        animationType="slide">
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Giờ</Text>
            <Text style={styles.title}>Phút</Text>
          </View>
  
          <View style={styles.pickerContainer}>
            <WheelPicker
              ref={hourRef}
              data={hours()}
              onChange={onHourChange}
            />
            
            <WheelPicker
              ref={minuteRef}
              data={minutes()}
              onChange={onMinuteChange}
            />
          </View>
          <ButtonComponent
            buttonText="Chọn"
            colorButton="#4BA2B6"
            onPress={() => {
              const hour = !Number(hourRef.current)?"00":hourRef.current
              const minute = !Number(minuteRef.current)?"00":minuteRef.current
              const output = `${hour}:${minute}`
                
              console.log(output)
              onConfirm?.(output);
            }}
            style={styles.button}
          />
        </View>
      </CustomModal>
    );
  };
  
  export default TimePickerComponent;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      bottom: 0,
      flex: 1,
      position: 'absolute',
      width: '100%',
      borderRadius: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 0,
      paddingTop: 10,
    },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 25,
      color: '#4BA2B6',
      fontWeight: 'bold',
      flex: 1, // Đảm bảo các chữ "Giờ" và "Phút" có chiều dài như nhau và căn giữa
      textAlign: 'center', // Căn giữa nội dung
    },
    button: {
      marginBottom: 40,
      marginHorizontal: 16,
    },
  });
  
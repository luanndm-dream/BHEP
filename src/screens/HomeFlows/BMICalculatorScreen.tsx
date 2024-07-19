import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Header } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATOR_SCREENS } from 'src/constants';

const BMICalculatorScreen = () => {
  const [gender, setGender] = useState('Nữ');
  const [height, setHeight] = useState(173);
  const [weight, setWeight] = useState(53);
  const navigation = useNavigation<any>();

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    navigation.navigate(STACK_NAVIGATOR_SCREENS.BMIRESULTSCREEN, { bmi });
  };

  return (
    <>
      <Header headerTitle='BMI' />
      <View style={styles.container}>
        <Text style={styles.title}>Chỉ số BMI</Text>
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Nam' && styles.selectedGender]}
            onPress={() => setGender('Nam')}
          >
            <Image source={require('../../assets/icons/man.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>NAM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Nữ' && styles.selectedGender]}
            onPress={() => setGender('Nữ')}
          >
            <Image source={require('../../assets/icons/woman.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>NỮ</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Chiều cao</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.value}>150</Text>
          <Slider
            style={styles.slider}
            minimumValue={150}
            maximumValue={200}
            step={1}
            value={height}
            onValueChange={(value) => setHeight(value)}
          />
          <Text style={styles.value}>200</Text>
        </View>
        <Text style={styles.value}>{height} Cm</Text>
        <Text style={styles.label}>Cân nặng</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.value}>30</Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={150}
            step={1}
            value={weight}
            onValueChange={(value) => setWeight(value)}
          />
          <Text style={styles.value}>150</Text>
        </View>
        <Text style={styles.value}>{weight} Kg</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => { setHeight(173); setWeight(53); setGender('Nữ'); }}>
            <Text style={styles.buttonText}>Làm mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Tính BMI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BMICalculatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedGender: {
    borderColor: 'green',
  },
  genderImage: {
    width: 50,
    height: 50,
  },
  genderText: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  value: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: 'pink',
  },
  calculateButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

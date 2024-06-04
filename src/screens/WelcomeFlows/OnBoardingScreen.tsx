import { FlatList, StyleSheet, Animated, View } from "react-native";
import React, { useRef, useState } from "react";
import { slidesData } from "src/data/slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STACK_NAVIGATOR_SCREENS } from "src/constants";
const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef<any>(null);
  const navigation = useNavigation<any>();

  const storeData = async (value:string) => {
    try {
      await AsyncStorage.setItem('onBoarding', value);
      console.log(value)
    } catch (e) {
      console.log('lỗi storeData onboarding')

    }
  };
  const scrollTo = () => {
    if (currentIndex < slidesData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else if (currentIndex === slidesData.length-1) {
        storeData('true');

        navigation.reset({
          index: 0,
          routes: [{ name: STACK_NAVIGATOR_SCREENS?.LOGINSCREEN}]
        });
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          data={slidesData}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slidesData} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / slidesData.length)}
        scrollTo={scrollTo}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

import { FlatList, StyleSheet, Animated, View } from "react-native";
import React, { useRef, useState } from "react";
import { slidesData } from "src/data/slides";
import OnBoardingItem from "./OnBoardingItem";
const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}: any)=>{
    setCurrentIndex(viewableItems[0].index);
  }).current
  
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current
  const slidesRef = useRef(null)

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        data={slidesData}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
});

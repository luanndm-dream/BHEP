import React, {RefAttributes, forwardRef, memo, useMemo, useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface WheelPickerProps {
  index?: any;
  data?: any;
  onChange: (currentDate: any, currentIndex: any) => void;
  itemHeight?: number;
}
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WheelPicker: React.FC<WheelPickerProps & RefAttributes<FlatList<any>>> =
  forwardRef((props, ref) => {
    const {index, data, onChange, itemHeight = 50} = props;
    const visibleRest = 2;
    const containerHeight = itemHeight * (1 + visibleRest * 2);
    const wheelData = [null, null, ...data, null, null];

    const translationY = useSharedValue(0);
    const canMomentum = useRef(false);

    const getItemLayout = (data?: any, index?: any) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    });

    const offsets = useMemo(
      () => [...Array(wheelData.length)].map((x, i) => i * itemHeight),
      [wheelData, itemHeight],
    );

    const scrollHandler = useAnimatedScrollHandler(
      (event: {contentOffset: {y: number}}) => {
        translationY.value = event.contentOffset.y;
      },
    );

    const onMomentumScrollBegin = () => {
      canMomentum.current = true;
    };

    const onMomentumScrollEnd = () => {
      if (canMomentum.current) {
        canMomentum.current = false;
        let offset = translationY.value;
        let currenIndex = Math.round(offset / itemHeight);
        const currentData = data[currenIndex]?.value;
        onChange?.(currentData, currenIndex);
      }
    };

    const WheelItem = memo(({item, index}: {item: any; index: number}) => {
      const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
          translationY.value,
          [
            (index - 2) * itemHeight,
            (index - 1) * itemHeight,
            index * itemHeight,
            (index + 1) * itemHeight,
            (index + 2) * itemHeight,
          ],
          [0.82, 0.9, 1.05, 0.9, 0.82],
          Extrapolate.CLAMP,
        );

        const opacity = interpolate(
          translationY.value,
          [
            (index - 2) * itemHeight,
            (index - 1) * itemHeight,
            index * itemHeight,
            (index + 1) * itemHeight,
            (index + 2) * itemHeight,
          ],
          [0.4, 0.7, 1.2, 0.7, 0.4],
          Extrapolate.CLAMP,
        );

        return {
          transform: [{scale}],
          opacity,
        };
      });
      return (
        <Animated.View style={animatedStyle}>
      
            <Text key={index} style={[styles.label, {height: itemHeight}]}>
              {item?.label}
            </Text>

        </Animated.View>
      );
    });

    return (
      <View style={{flex: 1}}>
        <View style={{height: containerHeight, justifyContent: 'center'}}>
          <View style={[styles.indicator, {height: itemHeight}]}></View>
        </View>
        <View
          style={{
            height: containerHeight,
            position: 'absolute',
            width: '100%',
          }}>
          <AnimatedFlatList
            ref={ref}
            initialScrollIndex={index}
            snapToInterval={itemHeight}
            snapToOffsets={offsets}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={wheelData}
            renderItem={({item, index}: {item: any; index: any}) => {
              return <WheelItem index={index - visibleRest} item={item} />;
            }}
            getItemLayout={getItemLayout}
            onScroll={scrollHandler}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            //   onScrollBeginDrag={onScrollBeginDrag}
            //   onScrollEndDrag={onScrollEndDrag}
            keyExtractor={(item: any, index: number) => index.toString()}
          />
        </View>
      </View>
    );
  });

export default WheelPicker;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  indicator: {
    borderRadius: 4,
    marginHorizontal: 18,
    backgroundColor: '#F6F7F8',
    marginBottom: 20,
    
  },
  label: {
    textAlign: 'center',
    width: '100%',
    // textAlignVertical: 'center',
    fontSize: 25,
    color: '#394960',
    fontWeight: 'bold',
  },
});

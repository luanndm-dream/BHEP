import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalFontSize } from "src/constants/fontSize";

interface FeatureCardProps {
  iconName: string;
  featureName: string;
  backgroundIconColor: any,
  onPress?: ()=> any;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  featureName,
  iconName,
  onPress,

  backgroundIconColor
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.labelContainer}>
        <View style={[styles.iconContainer,{backgroundColor: backgroundIconColor}]}>
          <MaterialCommunityIcons name={iconName} size={40} color={'white'} />
        </View>

        <Text style={styles.featureName}>{featureName}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={30} />
    </TouchableOpacity>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    marginVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureName: {
    fontSize: globalFontSize.labelName,
    fontWeight: "600",
    marginLeft: 15,
    color: "black",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

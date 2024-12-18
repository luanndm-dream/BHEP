import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { globalColor } from "src/constants/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle } from "src/constants";
interface ScheduleItemProps {
  name?: string;
  date: any;
  status?: number;
  image?: string,
  onPress?: () => void;
  time?: string
}
const ScheduleItem: React.FC<ScheduleItemProps> = ({
  date,
  name,
  onPress,
  status,
  image,
  time
}) => {
  const [datePart, timePart] = date.split(" ");
  const renderIconStatus = () => {
    switch (status) {
      case -1:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Từ chối</Text>
            <MaterialCommunityIcons name="cancel" size={30} color="red" />
          </View>
        );
      case 0:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đang chờ</Text>
            <MaterialCommunityIcons name="sync" size={30} color="orange" />
          </View>
        );
      case 1:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Chấp nhận</Text>
            <MaterialCommunityIcons
              name="heart-circle"
              size={30}
              color="#31ffba"
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đã hoàn thành</Text>
            <MaterialCommunityIcons
              name="check-circle"
              size={30}
              color="#01c80b"
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Bị huỷ</Text>
            <MaterialCommunityIcons name="close" size={30} color="red" />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: image}} style={{height: 30, width: 30, borderRadius: 15}}/>
        <Text style={[globalStyle.textNormal,{marginLeft: 12, color: 'white', fontWeight: '600'}]}>{name}</Text>
        </View>
      
        <View>{renderIconStatus()}</View>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.lable}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color="white"
          />
          <Text style={styles.value}>{datePart}</Text>
        </View>
        <View style={styles.lable}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={20}
            color="white"
          />
          <Text style={styles.value}>{time}</Text>
        </View>
      </View>
      {/* <Text>{name}</Text> */}
    </TouchableOpacity>
  );
};

export default ScheduleItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    margin: 6,
    backgroundColor: globalColor.secondaryColor,
    borderRadius: 12,
    padding: 6,
  },
  contentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 8,
    // flex: 1,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 10,
    marginHorizontal: 12,
    backgroundColor: "#c1ceda",
    opacity: 1,
    padding: 8,
    borderRadius: 8,
    marginTop: 40
  },
  lable: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginRight: 8,
    fontSize: 16,
    color: "white",
  },
});

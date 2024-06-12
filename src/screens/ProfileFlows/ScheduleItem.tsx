import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { globalColor } from "src/constants/color";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
interface ScheduleItemProps {
  name?: string;
  date: any;
  status?: number;
  onPress?: () => void;
}
const ScheduleItem: React.FC<ScheduleItemProps> = ({
  date,
  name,
  onPress,
  status,
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
            <Text style={styles.statusText}>Đang chờ xác nhận</Text>
            <MaterialCommunityIcons name="sync" size={30} color="orange" />
          </View>
        );
      case 1:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đã chấp nhận</Text>
            <MaterialCommunityIcons name="heart-circle" size={30} color="#31ffba" />
          </View>
        );
      case 2:
        return (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Đã hoàn thành</Text>
            <MaterialCommunityIcons name="check-circle" size={30} color="#01c80b" />
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
        <View></View>
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
          <Text style={styles.value}>Time nè</Text>
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
    padding: 6
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 8,
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 8,
    fontSize: 16,
    color: 'white',
  },
});

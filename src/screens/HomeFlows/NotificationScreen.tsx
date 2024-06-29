import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, Header, SpaceComponent } from "@/components";
import { useAppSelector } from "@/redux";
import { globalStyle } from "src/constants";
import { globalColor } from "src/constants/color";
import firestore from "@react-native-firebase/firestore";
import NotificationItem from "./NotificationItem";

const NotificationScreen = () => {
  const user = useAppSelector((state) => state.user.userData);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    firestore()
      .collection("notification")
      // .where("isRead", "==", false)
      .where("uid", "==", user.id)
      .onSnapshot((snap) => {
        if (snap && !snap.empty) {
          const items: any = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(items);
        } else {
          setNotifications([]);
        }
      });
  }, []);

  console.log(notifications)
  return (
    <>
      <Header headerTitle="Thông báo" />
      <SafeAreaView style={styles.container}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <NotificationItem item={item} key={index} />
            )}
          />
        ) : (
          <View style={styles.noNotificationContainer}>
            <Image
              source={require("../../assets/image/noNotification.png")}
              style={styles.noNotificationImage}
            />
            <Text style={styles.noNotificationText}>Không có thông báo</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noNotificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationImage: {
    height: 100,
    width: 100,
  },
  noNotificationText: {
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
  contentContainer: {
    // flexDirection: ,
    paddingHorizontal: 12,
    marginRight: 28,
    flex: 1,
  },
  acceptButton: {
    height: 40,
    backgroundColor: globalColor.primaryColor,
    borderRadius: 8,
    marginLeft: 6,
  },
  rejectButton: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "white",
  },
  // notificationContainer: {
  //   padding: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  // },
});

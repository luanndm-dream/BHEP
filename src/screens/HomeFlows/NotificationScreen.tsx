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
  
  const NotificationScreen = () => {
    const user = useAppSelector((state) => state.user.userData);
    const [notifications, setNotifications] = useState([]);
    const notification = {
      fromUserId: 11,
      toUserId: 0,
      createdAt: Date.now(),
      content: "ABC Sieu manh ABC Sieu manh",
      userReadId: 0,
      appointmentId: 0,
      isRead: false,
    };
  
    useEffect(() => {
      const items: any = [];
      Array.from({ length: 100 }).forEach((item, index) =>
        items.push({ ...notification, id: index })
      );
      setNotifications(items);
    }, []);
  
    const renderNotificationItem = ({ item }: any) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 16,
          marginBottom: 20,
          marginVertical: 12,
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkNIVr5R4VW-iLbx3OrHilblkU9s4E3HOWA&s",
          }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <View style={styles.contentContainer}>
          <Text style={[globalStyle.textNormal, { fontWeight: "700" }]}>
            Hú hú hú{" "}
            <Text
              style={[
                globalStyle.textNormal,
                { marginLeft: 10, fontWeight: "normal" },
              ]}
            >
              {item.content}
            </Text>
          </Text>
          <SpaceComponent height={16} />
          <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ButtonText
            onPress={() => {}}
            text="Từ chối"
            styleContainer={styles.rejectButton}
            styleText={{color: 'grey'}}
          />
          <ButtonText
            onPress={() => {}}
            text="Chấp nhận"
            styleContainer={styles.acceptButton}
            styleText={{fontWeight: 'bold'}}
          />
          </View>
          
        </View>
        <Text style={{ fontSize: 16, color: "grey" }}>abe</Text>
      </View>
    );
  
    return (
      <>
        <Header headerTitle="Thông báo" />
        <SafeAreaView style={styles.container}>
          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderNotificationItem}
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
      height:40,
      backgroundColor: globalColor.primaryColor,
      borderRadius: 8,
      marginLeft: 6
    },
    rejectButton: {
      height:40,
      borderRadius: 8,
      backgroundColor: 'white',
    },
    // notificationContainer: {
    //   padding: 10,
    //   borderBottomWidth: 1,
    //   borderBottomColor: "#ccc",
    // },
  });
  
  
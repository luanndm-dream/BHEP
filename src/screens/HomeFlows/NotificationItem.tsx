import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonText, SpaceComponent } from "@/components";
import { globalStyle } from "src/constants";
import { globalColor } from "src/constants/color";
import { apiGetUserById } from "src/api/api_getUserById";
import getElapsedTime from "src/constants/DateFormater";
import firestore from "@react-native-firebase/firestore";
import { apiPutAppointmentWithStatus } from "src/api/api_put_Appointment";

interface NotificationItemProps {
  item: NotificationModelType;
}
const NotificationItem: React.FC<NotificationItemProps> = (
  NotificationItemProps
) => {
  const { item } = NotificationItemProps;
  const [user, setUser] = useState<any>();

  useEffect(() => {
    apiGetUserById(item.fromUserId).then((res: any) => {
      setUser(res.data);
    });
  }, [item.fromUserId]);

  const handleRemoveNotification = async () => {
    // try {
    //   const res:any = await apiPutAppointmentWithStatus(
    //     Number(item.appointmentId),
    //     item.fromUserId,
    //     Number(item.toUserId),
    //     3
    //   );
    //   console.log(res)

    // if (res.statusCode === 200) {
    await firestore()
      .collection("notification")
      .doc(item.id) // Ensure document ID is a string if necessary
      .delete();

    // } else {
    // }

    console.log(item.appointmentId);
  };

  const handleAccpet = async () => {
    await firestore().collection("notification").doc(item.id).update({
      isRead: true,
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingHorizontal: 16,
        marginBottom: 20,
        marginVertical: 12,
      }}
    >
      {user?.avatar ? (
        <Image
          source={{
            uri: user?.avatar,
          }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      ) : (
        <Image
          source={require("../../assets/image/avatarDefault.png")}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      )}

      <View style={styles.contentContainer}>
        <Text
          style={[
            globalStyle.textNormal,
            { fontWeight: "700", color: globalColor.primaryColor },
          ]}
        >
          {user ? `${user.fullName} ` : ""}
          <Text
            style={[
              globalStyle.textNormal,
              {
                marginLeft: 10,
                fontWeight: item.isRead ? "normal" : "700",
                color: item.isRead ? "grey" : "black",
              },
            ]}
          >
            {item.content}
          </Text>
        </Text>
        <SpaceComponent height={16} />
        {!item.isRead ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ButtonText
              onPress={handleRemoveNotification}
              text="Từ chối"
              styleContainer={styles.rejectButton}
              styleText={{ color: "grey" }}
            />
            <ButtonText
              onPress={handleAccpet}
              text="Chấp nhận"
              styleContainer={styles.acceptButton}
              styleText={{ fontWeight: "bold" }}
            />
          </View>
        ) : null}
      </View>
      <View >
      <Text style={{ fontSize: 16, color: "grey" }}>
        {getElapsedTime(item?.createdAt)}
      </Text>
      <Text style={{ fontSize: 16, color: "grey", textAlign:'right' }}>
        {item.isRead&&'Chấp nhận'}
      </Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  contentContainer: {
    // flexDirection: ,
    paddingHorizontal: 4,
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
});

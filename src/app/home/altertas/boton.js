import React from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationSender = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const sendPushNotification = async () => {
    const userToken = "ExponentPushToken[oia88HJh3FVSMP-407At5g]";
    const message = {
      to: userToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
    };
    const data = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log("Notificación enviada correctamente", message);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Enviar Notificación"
        onPress={() => sendPushNotification()}
      />
    </View>
  );
};

export default NotificationSender;

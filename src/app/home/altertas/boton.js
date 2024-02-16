import React from "react";
import { View, Button } from "react-native";
import { useTokenContact } from "../../../components/context/ContactContext";
import { sendPushNotification } from "./pushnotification";

const NotificationSender = () => {
  const { tokencontact } = useTokenContact();
  const handleSendNotification = async () => {
    console.log("redisSendNotification");
    await sendPushNotification(tokencontact);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Enviar Notificación"
        onPress={() => handleSendNotification()}
      />
    </View>
  );
};

export default NotificationSender;

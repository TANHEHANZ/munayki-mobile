
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export const sendPushNotification = async (tokencontact) => {
  try {
    for (const userToken of tokencontact) {
      const message = {
        to: userToken,
        sound: "default",
        title: "Botton de panico accionado ",
        body: "usuario alertando ",
      };
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (response.ok) {
        console.log("Notificación enviada correctamente a", userToken);
      } else {
        console.error("Error al enviar la notificación a", userToken);
      }
    }
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
  }
};

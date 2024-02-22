
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const sendPushNotification = async (tokencontact, user) => {
  try {
    for (const userToken of tokencontact) {
      const message = {
        to: userToken,
        sound: "default",
        title: "MUNAYKI",
        body:
          "Botton de panico accionado ,alerta del usuario " +
          user.login[0].nombre,
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

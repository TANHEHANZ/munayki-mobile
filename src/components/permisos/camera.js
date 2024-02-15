import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationComponent = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log('Permiso de notificación denegado');
          return;
        }
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Token de notificación:', token);
    };

    requestPermissions();
  }, []);

  return null;
};

export default NotificationComponent;

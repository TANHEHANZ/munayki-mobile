import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      console.log('Permiso de notificación denegado');
      return;
    }
  }
  const token = (await Notifications.getExpoPushTokenAsync());
  try {
    await AsyncStorage.setItem('notificationToken', token);
    console.log('Token de notificación guardado en el almacenamiento local');
  } catch (error) {
    console.error('Error al guardar el token de notificación:', error);
  }
};

const NotificationComponent = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return null;
};

export default NotificationComponent;

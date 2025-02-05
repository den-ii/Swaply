import messaging, {
  getInitialNotification,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { Href, router } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
  return enabled;
};

export const handleNotificationClick = async (response: any) => {
  const screen = response?.notification?.request?.content?.data?.screen;
  if (screen !== null) {
    router.navigate(screen);
  }
};

export const notificationClickSubscription =
  Notifications.addNotificationResponseReceivedListener(
    handleNotificationClick
  );

export const handlePushNotification = async (remoteMessage: any) => {
  const notification = {
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    data: remoteMessage.data, // optional data payload
  };

  // Schedule the notification with a null trigger to show immediately
  await Notifications.scheduleNotificationAsync({
    content: notification,
    trigger: null,
  });
};

export const notificationOpenedApp = (remoteMessage: any) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage.data?.screen,
    router
  );
  if (remoteMessage?.data?.screen) {
    router.navigate(`${remoteMessage.data?.screen}` as Href<string | object>);
  }
};

export const getInitialNotificationMessageHandler = async (
  remoteMessage: any
) => {
  if (remoteMessage) {
    console.log(
      "Notification caused app to open from quit state:",
      remoteMessage.notification
    );
    if (remoteMessage?.data?.screen) {
      router.navigate(`${remoteMessage.data.screen}` as Href<string | object>);
    }
  }
};

export const setBackgroundMessageHandler = async (remoteMessage: any) => {
  console.log("Message handled in the background!", remoteMessage);
  const notification = {
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    data: remoteMessage.data, // optional data payload
  };

  // Schedule the notification with a null trigger to show immediately
  await Notifications.scheduleNotificationAsync({
    content: notification,
    trigger: null,
  });
};

// Handle user opening the app from a notification (when the app is in the background)
messaging().onNotificationOpenedApp((remoteMessage) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage.data?.screen,
    router
  );
  if (remoteMessage?.data?.screen) {
    router.navigate(`${remoteMessage.data?.screen}` as Href<string | object>);
  }
});

// Check if the app was opened from a notification (when the app was completely quit)
messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage.notification
      );
      if (remoteMessage?.data?.screen) {
        router.navigate(
          `${remoteMessage.data.screen}` as Href<string | object>
        );
      }
    }
  });

messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  console.log("Message handled in the background!", remoteMessage);
  const notification = {
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    data: remoteMessage.data, // optional data payload
  };

  // Schedule the notification with a null trigger to show immediately
  await Notifications.scheduleNotificationAsync({
    content: notification,
    trigger: null,
  });
});

// const handlePushNotification = async (remoteMessage: any) => {
//   const notification = {
//     title: remoteMessage.notification.title,
//     body: remoteMessage.notification.body,
//     data: remoteMessage.data, // optional data payload
//   };

//   // Schedule the notification with a null trigger to show immediately
//   await Notifications.scheduleNotificationAsync({
//     content: notification,
//     trigger: null,
//   });
// };

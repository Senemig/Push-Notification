import PushNotification from 'react-native-push-notification';

let navigator;

class Notification {
  setNavigator(newContent) {
    navigator = newContent;
  }
  newChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };
  configuration = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('[NotificationManager] onRegister token:', token);
      },
      onNotification: function (notification) {
        console.log('[NotificationManager] onNotification:', notification);
        navigator.navigate('Destination');
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
      },
    });
  };
  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      channelId: 'channel-id',
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };
  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      ...this.buildAndroidNotification(id, title, message, data, options),

      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false,
    });
  };
  agendNotification() {
    console.log('Entrando no agendNotification');

    PushNotification.localNotificationSchedule({
      id: 2,
      channelId: 'channel-id',
      largeIcon: 'ic_burger',
      smallIcon: 'ic_burger',
      title: 'Tem CUPOM pra voc??!',
      message: 'Mate a fome pagando menos!',
      date: new Date(Date.now() + 300 * 1000),
      allowWhileIdle: false,
      repeatTime: 900 * 1000,
      repeatType: 'time',
    });

    PushNotification.localNotificationSchedule({
      id: 3,
      channelId: 'channel-id',
      largeIcon: 'ic_burger',
      smallIcon: 'ic_burger',
      title: 'Pizza, lanche, sushi?',
      message: 'O que voc?? quiser, o importante ?? comer!',
      date: new Date(Date.now() + 600 * 1000),
      allowWhileIdle: false,
      repeatTime: 900 * 1000,
      repeatType: 'time',
    });

    PushNotification.localNotificationSchedule({
      id: 4,
      channelId: 'channel-id',
      largeIcon: 'ic_burger',
      smallIcon: 'ic_burger',
      title: 'Dia da PIZZA!',
      message: 'S?? hoje! 25% de desconto em qualquer pedido de #PIZZA!',
      date: new Date(Date.now() + 900 * 1000),
      allowWhileIdle: false,
      repeatTime: 900 * 1000,
      repeatType: 'time',
    });
  }

  cancelAllLocalNotifications = () => {
    console.log('Entrando no cancelNotification');

    PushNotification.cancelAllLocalNotifications();
  };
}

export const notificationManager = new Notification();

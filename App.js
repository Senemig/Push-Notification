import React, {Component} from 'react';
import {notificationManager} from './src/Services/Notification';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './src/Screens/Index';
import Destination from './src/Screens/Destination';

const Stack = createStackNavigator();
const notificator = notificationManager;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    notificator.newChannel();
    notificator.configuration();
  }

  cancellNotifications = () => {
    notificator.cancelAllLocalNotifications();
    notificator.showNotification(
      1,
      'Notificações Canceladas',
      'Agora você não vai mais receber notificações a cada 5 minutos!',
      {}, // data
      {smallIcon: 'ic_burger', largeIcon: 'ic_burger'}, // options
    );
  };

  sendNotify = () => {
    notificator.agendNotification();
    notificator.showNotification(
      1,
      'Notificações ativadas!',
      'Agora você vai receber notificações a cada 5 minutos!',
      {}, // data
      {smallIcon: 'ic_burger', largeIcon: 'ic_burger'}, // options
    );
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {({navigation}) => {
              notificator.setNavigator(navigation);
              return (
                <Index
                  navigator={navigation}
                  sendNotification={this.sendNotify}
                  cancellNotifications={this.cancellNotifications}
                />
              );
            }}
          </Stack.Screen>

          <Stack.Screen name="Destination" options={{title: 'Detalhes'}}>
            {({navigation}) => {
              return <Destination navigator={navigation} />;
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

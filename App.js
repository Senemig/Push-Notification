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
    notificator.agendNotification();
    notificator.newChannel();
    notificator.configuration();
  }

  sendNotify = () => {
    notificator.showNotification(
      1,
      'Notificação de Teste!',
      'Clique para ir à página de destino!',
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

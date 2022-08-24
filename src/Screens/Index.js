import React from 'react';
import {View, Button, StyleSheet, Image} from 'react-native';

export default function Index(props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.creativefabrica.com/wp-content/uploads/2020/09/04/Smile-Symbol-Food-Logo-Design-Graphics-5283452-1-580x387.jpg',
        }}
        style={styles.image}
      />
      <View style={styles.btnGroup}>
        <Button
          title="Testar notificação"
          onPress={() => props.sendNotification()}></Button>
        <Button
          title="Cancelar Notificações"
          onPress={() => props.cancellNotifications()}></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dedede',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 40,
  },
  btnGroup: {
    height: 100,
    justifyContent: 'space-evenly',
  },
});

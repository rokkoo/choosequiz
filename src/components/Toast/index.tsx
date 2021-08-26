import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Toast = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pregunta hecha por</Text>
      <Text style={[styles.text, styles.fromText]}>Alfonso</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#5DADE2',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  text: {
    fontWeight: 'bold',
    color: '#273746',
  },
  fromText: {
    color: '#8E44AD',
    marginLeft: 4,
  },
});

export default Toast;

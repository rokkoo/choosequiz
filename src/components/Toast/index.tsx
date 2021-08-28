import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ToastProps {
  text: string;
}

const Toast = ({ text }: ToastProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {/* <Text style={[styles.text, styles.fromText]}>Alfonso</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#34495E',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    color: '#F7F9F9',
    fontSize: 32,
  },
  fromText: {
    color: '#8E44AD',
    marginLeft: 4,
  },
});

export default Toast;

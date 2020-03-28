import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
  const toDestruct = props.isTitle ? styles.title : styles.text;
  return (
    <Text style={{ ...toDestruct, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    margin: 15,
    textAlign: 'center'
  }
});

export default DefaultText;

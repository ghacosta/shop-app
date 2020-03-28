import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';

const ProductItem = props => {
  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={{ uri: props.imageUrl }} />
      <DefaultText isTitle>{props.title}</DefaultText>
      <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
      <View style={styles.actions}>
        <Button title="DETAILS" color={Colors.accent} />
        <Button title="ADD TO CART" color={Colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 400,
    margin: 20
  },
  image: {
    width: '100%',
    height: '60%'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15
  },
  price: {
    fontSize: 14,
    color: '#888'
  }
});

export default ProductItem;

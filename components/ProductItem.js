import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';

const ProductItem = props => {
  let content = (
    <React.Fragment>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.imageUrl }} />
      </View>
      <DefaultText isTitle>{props.title}</DefaultText>
      <DefaultText style={styles.price}>${props.price.toFixed(2)}</DefaultText>
      <View style={styles.actions}>
        <Button
          title="DETAILS"
          color={Colors.accent}
          onPress={props.onViewDetail}
        />
        <Button title="ADD TO CART" color={Colors.primary} />
      </View>
    </React.Fragment>
  );

  if (Platform.OS === 'android') {
    return (
      <View style={styles.screen}>
        <View style={styles.touchable}>
          <TouchableNativeFeedback onPress={props.onViewDetail} useForeground>
            <View>{content}</View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onViewDetail}>
        <View style={styles.screen}>{content}</View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    borderRadius: 10,
    backgroundColor: 'white',
    height: 400,
    margin: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  image: {
    width: '100%',
    height: '100%'
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

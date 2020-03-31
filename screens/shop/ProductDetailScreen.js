import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button title="Add to Cart" onPress={() => {}} color={Colors.primary} />
      </View>
      <DefaultText style={styles.price} isTitle>
        ${selectedProduct.price.toFixed(2)}
      </DefaultText>
      <DefaultText style={styles.description}>
        {selectedProduct.description}
      </DefaultText>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    color: '#888'
  },
  description: {
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;

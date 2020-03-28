import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    ) : (
      <AppLoading />
    );
  }
}

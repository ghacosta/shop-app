import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
	cart: cartReducer,
	products: productsReducer,
	orders: ordersReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends React.Component {
	state = {
		fontLoaded: false,
	};

	async componentDidMount() {
		await Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
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

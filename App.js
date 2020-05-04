import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
	cart: cartReducer,
	products: productsReducer,
	orders: ordersReducer,
	auth: authReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
	// compose(
	// 	applyMiddleware(thunk),
	// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	// )
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

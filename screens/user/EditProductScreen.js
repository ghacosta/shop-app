import React, { useEffect, useCallback, useRef } from 'react';
import {
	View,
	ScrollView,
	Text,
	TextInput,
	StyleSheet,
	Platform,
	Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = (props) => {
	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state) =>
		state.products.userProducts.find((prod) => prod.id === prodId)
	);
	const dispatch = useDispatch();
	const formikRef = useRef();

	const submitHandler = useCallback(() => {
		if (formikRef.current) {
			if (!formikRef.current.isValid) {
				Alert('Form Error', 'Check your form for errors before submitting', [
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
				]);
				return;
			}
			const { values } = formikRef.current;
			if (editedProduct) {
				dispatch(
					productsActions.updateProduct(
						prodId,
						values.title,
						values.description,
						values.imageUrl
					)
				);
			} else {
				dispatch(
					productsActions.createProduct(
						values.title,
						values.description,
						values.imageUrl,
						values.price
					)
				);
			}
		}
		props.navigation.goBack();
	}, [formikRef, dispatch, prodId]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Formik
					innerRef={formikRef}
					initialValues={{
						title: editedProduct ? editedProduct.title : '',
						imageUrl: editedProduct ? editedProduct.imageUrl : '',
						price: '',
						description: editedProduct ? editedProduct.description : '',
					}}
					validationSchema={yup.object().shape({
						title: yup.string().required(),
						imageUrl: yup.string().url().required(),
						price: editedProduct
							? yup.number().positive()
							: yup
									.number()
									.typeError('price must be a number')
									.positive()
									.required(),
						description: yup.string().required(),
					})}
				>
					{({
						handleChange,
						handleBlur,
						values,
						touched,
						errors,
						setFieldValue,
					}) => (
						<React.Fragment>
							<View style={styles.formControl}>
								<Text style={styles.label}>Title</Text>
								<TextInput
									style={styles.input}
									onChangeText={handleChange('title')}
									onBlur={handleBlur('title')}
									value={values.title}
									returnKeyType="next"
									autoCapitalize="sentences"
								/>
								{touched.title && errors.title && (
									<Text style={styles.error}>{errors.title}</Text>
								)}
							</View>
							<View style={styles.formControl}>
								<Text style={styles.label}>Image URL</Text>
								<TextInput
									style={styles.input}
									onChangeText={handleChange('imageUrl')}
									onBlur={handleBlur('imageUrl')}
									value={values.imageUrl}
									returnKeyType="next"
									autoCorrect
								/>
								{touched.imageUrl && errors.imageUrl && (
									<Text style={styles.error}>{errors.imageUrl}</Text>
								)}
							</View>
							{editedProduct ? null : (
								<View style={styles.formControl}>
									<Text style={styles.label}>Price</Text>
									<TextInput
										style={styles.input}
										value={values.price}
										onChangeText={(value) =>
											setFieldValue('price', parseFloat(value))
										}
										onBlur={handleBlur('price')}
										keyboardType="decimal-pad"
										returnKeyType="next"
									/>
									{touched.price && errors.price && (
										<Text style={styles.error}>{errors.price}</Text>
									)}
								</View>
							)}
							<View style={styles.formControl}>
								<Text style={styles.label}>Description</Text>
								<TextInput
									style={styles.input}
									value={values.description}
									onChangeText={handleChange('description')}
									onBlur={handleBlur('description')}
									multiline
								/>
								{touched.description && errors.description && (
									<Text style={styles.error}>{errors.description}</Text>
								)}
							</View>
						</React.Fragment>
					)}
				</Formik>
			</View>
		</ScrollView>
	);
};

EditProductScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFn}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
	error: {
		color: 'red',
	},
});

export default EditProductScreen;

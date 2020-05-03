import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	ScrollView,
	View,
	TextInput,
	Text,
	StyleSheet,
	Button,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as authActions from '../../store/actions/auth';
import OutlineButton from '../../components/UI/OutlineButton';

const AuthScreen = (props) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			console.log('ALERT ERROR:', error);
			Alert.alert('An error ocurred', error, [{ text: 'Okay' }]);
		}
	}, [error]);

	const authHandler = async (email, password) => {
		let action;
		if (isSignup) {
			action = authActions.signup(email, password);
		} else {
			action = authActions.login(email, password);
		}
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	return (
		<LinearGradient
			colors={[Colors.accent, Colors.primary]}
			style={styles.gradient}
		>
			<Card style={styles.authContainer}>
				<ScrollView>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={yup.object().shape({
							email: yup.string().email().required(),
							password: yup.string().min(6).required(),
						})}
					>
						{({
							handleChange,
							handleBlur,
							values,
							touched,
							errors,
							isValid,
							dirty,
						}) => (
							<React.Fragment>
								<View style={styles.formControl}>
									<Text style={styles.label}>Email</Text>
									<TextInput
										style={styles.input}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
										value={values.email}
										autoCapitalize="none"
										keyboardType="email-address"
										returnKeyType="next"
									/>
									{touched.email && errors.email && (
										<Text style={styles.error}>{errors.email}</Text>
									)}
								</View>
								<View style={styles.formControl}>
									<Text style={styles.label}>Password</Text>
									<TextInput
										style={styles.input}
										onChangeText={handleChange('password')}
										onBlur={handleBlur('password')}
										value={values.password}
										autoCapitalize="none"
										secureTextEntry
									/>
									{touched.password && errors.password && (
										<Text style={styles.error}>{errors.password}</Text>
									)}
								</View>
								<View style={styles.buttonContainer}>
									{isLoading ? (
										<ActivityIndicator size="small" color={Colors.primary} />
									) : (
										<Button
											title={isSignup ? 'Sign Up' : 'Log In'}
											color={isSignup ? Colors.accent : Colors.primary}
											onPress={() => authHandler(values.email, values.password)}
											disabled={!(isValid && dirty)}
										/>
									)}
								</View>
								<View style={styles.buttonContainer}>
									<OutlineButton
										title={isSignup ? 'switch to login' : 'switch to signup'}
										color={isSignup ? Colors.accent : Colors.primary}
										onPress={() => {
											setIsSignup((prevState) => !prevState);
										}}
									/>
								</View>
							</React.Fragment>
						)}
					</Formik>
				</ScrollView>
			</Card>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},
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
	buttonContainer: {
		marginTop: 10,
	},
});

export default AuthScreen;

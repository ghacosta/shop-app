import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	ScrollView,
	View,
	TextInput,
	Text,
	StyleSheet,
	Button,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as authActions from '../../store/actions/auth';
import OutlineButton from '../../components/UI/OutlineButton';

const AuthScreen = (props) => {
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();

	const authHandler = (email, password) => {
		if (isSignup) {
			dispatch(authActions.signup(email, password));
		} else {
			dispatch(authActions.login(email, password));
		}
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
							password: yup.string().required(),
						})}
					>
						{({ handleChange, handleBlur, values, touched, errors }) => (
							<React.Fragment>
								<View style={styles.formControl}>
									<Text style={styles.label}>Email</Text>
									<TextInput
										style={styles.input}
										onChangeText={handleChange('email')}
										onBlur={handleBlur('email')}
										value={values.email}
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
									<Button
										title={isSignup ? 'Sign Up' : 'Log In'}
										color={isSignup ? Colors.accent : Colors.primary}
										onPress={() => authHandler(values.email, values.password)}
									/>
								</View>
								<View style={styles.buttonContainer}>
									<OutlineButton
										title={isSignup ? 'switch to login' : 'switch to signup'}
										color={isSignup ? Colors.accent : Colors.primary}
										onPress={() => {
											console.log(isSignup);
											setIsSignup((prevState) => !prevState);
											console.log(isSignup);
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

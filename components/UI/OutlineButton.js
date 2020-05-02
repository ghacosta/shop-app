import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

const OutlineButton = (props) => {
	return (
		<TouchableOpacity style={styles.screen} onPress={props.onPress}>
			<Text style={{ color: props.color ? props.color : Colors.primary }}>
				{props.title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default OutlineButton;

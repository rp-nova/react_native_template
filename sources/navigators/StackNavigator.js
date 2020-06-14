import React, { Component } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import BottomTabNavigator from './BottomTabNavigator'
import SecondScreen from '../screens/Second'

export default class extends Component {
	Stack = createStackNavigator()

	render() {
		const { Stack } = this

		return (
			<Stack.Navigator
				screenOptions = {{
					headerShown: false,
					...TransitionPresets.ScaleFromCenterAndroid
				}}
			>
				<Stack.Screen
					component = {BottomTabNavigator}
					name = 'BottomTab'
				/>

				<Stack.Screen
					component = {SecondScreen}
					name = 'Second'
					options = {{
						//...TransitionPresets.SlideFromRightIOS //Transisi bisa ditentukan per screen
					}}
				/>
			</Stack.Navigator>
		)
	}
}
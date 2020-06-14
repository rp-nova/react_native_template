import React, { Component } from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import Regions from '../screens/Regions'
import Countries from '../screens/Countries'

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
					component = {Regions}
					name = 'Regions'
				/>

				<Stack.Screen
					component = {Countries}
					name = 'Countries'
				/>
			</Stack.Navigator>
		)
	}
}
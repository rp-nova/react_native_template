import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/Home'
import OtherScreen from '../screens/Other'

export default class extends Component {
	Tab = createBottomTabNavigator()

	render() {
		const { Tab } = this

		return (
			<Tab.Navigator>
				<Tab.Screen
					name = 'Home'
					component = {HomeScreen}
				/>

				<Tab.Screen
					name = 'Other'
					component = {OtherScreen}
				/>
			</Tab.Navigator>
		)
	}
}
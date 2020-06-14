import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './navigators/StackNavigator'

import { DataContext } from './refs/contexts'

export default class extends Component {
	state = {
		number: 0
	}

	render() {
		return (
			<NavigationContainer>
				<DataContext.Provider
					value = {{
						number: this.state.number,
						setNumber: number => this.setState({number})
					}}
				>
					<StackNavigator />
				</DataContext.Provider>
			</NavigationContainer>
		)
	}
}
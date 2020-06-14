import React, { Component } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { DataContext } from '../refs/contexts'

export default class extends Component {
	render() {
		const { props } = this

		return (
			<View
				style = {{
					alignItems: 'center',
					flex: 1,
					justifyContent: 'center'
				}}
			>
				<Text
					style = {{
						fontSize: 36,
						fontWeight: 'bold'
					}}
				>
					Home Screen
				</Text>

				<TouchableOpacity
					onPress = {() => props.navigation.navigate('Second')}
					style = {{
						marginTop: 10,
						padding: 20
					}}
				>
					<Text
						style = {{
							color: 'blue',
							fontSize: 18
						}}
					>
						Go to second screen
					</Text>
				</TouchableOpacity>

				<Text
					style = {{
						marginTop: 100
					}}
				>
					Context API's global data test using number
				</Text>

				<DataContext.Consumer>
					{
						contextData => (
							<>
								<Text
									style = {{
										fontSize: 36,
										fontWeight: 'bold',
										marginTop: 20
									}}
								>
									{contextData.number}
								</Text>

								<TouchableOpacity
									onPress = {() => contextData.setNumber(contextData.number + 1)}
									style = {{
										marginTop: 20
									}}
								>
									<Text
										style = {{
											color: 'blue',
											fontSize: 18
										}}
									>
										Add
									</Text>
								</TouchableOpacity>
							</>
						)
					}
				</DataContext.Consumer>
			</View>	
		)
	}
}
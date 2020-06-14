import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './navigators/StackNavigator'

import { DataContext } from './refs/contexts'

import { BASE_URL }  from './refs/constants'

export default class extends Component {
	state = {
		countries: []
    }
    
    componentDidMount() {
        this.loadAllCountries()
    }

	render() {
		return (
			<NavigationContainer>
				<DataContext.Provider
					value = {{
						countries: this.state.countries,
						setCountries: countries => this.setState({countries})
					}}
				>
					<StackNavigator />
				</DataContext.Provider>
			</NavigationContainer>
		)
    }
    
    loadAllCountries() {
        fetch(`${BASE_URL}/all`)
        .then(res => res.json())
        .then(resJson => {
			const countries = resJson.map(country => ({
				...country,
				region: country['region'] != '' ? country['region'] : 'Other'
			}))

			this.setState({countries})
		})
    }
}
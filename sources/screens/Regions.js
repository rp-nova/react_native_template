import React, { Component } from 'react'

import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import { DataContext } from '../refs/contexts'

import { MAIN_COLOR } from '../refs/constants'

export default class extends Component {
    componentDidMount() {
        if(Platform.OS == 'android') {
            StatusBar.setBackgroundColor(MAIN_COLOR)
        }
    }

    render() {
        return (
            <SafeAreaView
                style = {{
                    backgroundColor: MAIN_COLOR,
                    flex: 1
                }}
            >
                <View
                    style = {{
                        backgroundColor: 'white',
                        flex: 1
                    }}
                >
                    {this.showTopBarUI()}

                    <ScrollView
                        contentContainerStyle = {{
                            padding: 20
                        }}
                    >
                        <DataContext.Consumer>
                            {
                                ({countries}) => this.showRegionsListUI(countries)
                            }
                        </DataContext.Consumer>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    showTopBarUI() {
        return (
            <View
                style = {{
                    backgroundColor: MAIN_COLOR,
                    height: 60,
                    justifyContent: 'center',
                    paddingHorizontal: 20
                }}
            >
                <Text
                    style = {{
                        color: 'white',
                        fontSize: 26,
                        fontWeight: 'bold'
                    }}
                >
                    Regions
                </Text>
            </View>
        )
    }

    showRegionsListUI(countries) {
        if(countries.length == 0) {
            return null
        }

        let allRegions = []

        const allRegionsFromCountries = countries.map(country => country['region'])

        const allRegionsWithoutDuplicate = [...new Set(allRegionsFromCountries)]

        allRegionsWithoutDuplicate.sort()
        allRegionsWithoutDuplicate.push(allRegionsWithoutDuplicate.splice(allRegionsWithoutDuplicate.indexOf('Other'), 1)[0])
    
        allRegions = allRegionsWithoutDuplicate

        return allRegions.map(region => this.showRegionsListItemUI(region))
    }

    showRegionsListItemUI(region) {
        return (
            <TouchableOpacity
                key = {region}
                onPress = {() => this.props.navigation.navigate('Countries', {pickedRegion: region})}
                style = {{
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    paddingVertical: 5
                }}
            >
                <Text
                    style = {{
                        fontSize: 18
                    }}
                >
                    {region}
                </Text>
            </TouchableOpacity>
        )
    }
}
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
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}
                        >
                            Regions
                        </Text>
                    </View>

                    <ScrollView
                        contentContainerStyle = {{
                            padding: 20
                        }}
                    >
                        <DataContext.Consumer>
                            {
                                ({countries}) => this.getAllRegions(countries).map(region => {
                                    let regionName = region != '' ? region : 'Other'
                    
                                    return (
                                        <TouchableOpacity
                                            key = {regionName}
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
                                                {regionName}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </DataContext.Consumer>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    getAllRegions(countries) {
        const allRegionsFromCountries = countries.map(({region}) => region)
        const allRegionsWithoutDuplicate = [...new Set(allRegionsFromCountries)]

        return allRegionsWithoutDuplicate
    }
}
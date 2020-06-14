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
                            {contextData => this.getRegionsListUI(contextData['countries'])}
                        </DataContext.Consumer>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    getAllRegions(countries) {
        let regions = []

        for(const country of countries) {
            let regionName = country['region']

            if(!regions.includes(regionName)) {
                regions.push(regionName)
            }
        }

        return regions
    }

    getRegionsListUI(countries) {
        return (
            this.getAllRegions(countries).map(item => {
                let regionName = item != '' ? item : 'Other'

                return (
                    <TouchableOpacity
                        key = {regionName}
                        onPress = {() => this.props.navigation.navigate('Countries', {pickedRegion: item})}
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
        )
    }
}
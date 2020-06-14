import React, { Component } from 'react'

import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { DataContext } from '../refs/contexts'

import { MAIN_COLOR } from '../refs/constants'

export default class extends Component {
    pickedRegion = this.props.route.params['pickedRegion']

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
                            {this.pickedRegion != '' ? this.pickedRegion : 'Other'}
                        </Text>
                    </View>

                    <ScrollView
                        contentContainerStyle = {{
                            padding: 20
                        }}
                    >
                        <DataContext.Consumer>
                            {
                                contextData => this.getCountriesListUI(contextData['countries'])
                            }
                        </DataContext.Consumer>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    getCountriesListUI(countries) {
        return (
            countries.filter(item => item['region'] == this.pickedRegion).map(item => {
                return (
                    <TouchableOpacity
                        key = {item['name']}
                        onPress = {() => console.log(item['name'])}
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
                            {item['name']}
                        </Text>
                    </TouchableOpacity>
                )
            }
        ))
    }
}
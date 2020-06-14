import React, { Component } from 'react'

import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import { DataContext } from '../refs/contexts'

import { MAIN_COLOR } from '../refs/constants'

import AntDesign from 'react-native-vector-icons/AntDesign'

export default class extends Component {
    pickedRegion = this.props.route.params['pickedRegion']

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
                            alignItems: 'center',
                            backgroundColor: MAIN_COLOR,
                            flexDirection: 'row',
                            height: 60,
                            paddingHorizontal: 20
                        }}
                    >
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.goBack()}
                            style = {{
                                marginRight: 10
                            }}
                        >
                            <AntDesign
                                color = 'white'
                                name = 'arrowleft'
                                size = {30}
                            />
                        </TouchableOpacity>

                        <Text
                            style = {{
                                color: 'white',
                                fontSize: 26,
                                fontWeight: 'bold'
                            }}
                        >
                            {this.pickedRegion}
                        </Text>
                    </View>

                    <ScrollView
                        contentContainerStyle = {{
                            padding: 20
                        }}
                    >
                        <DataContext.Consumer>
                            {
                                ({countries}) => {
                                    countries = countries.filter(country => country['region'] == this.pickedRegion)
                                    countries.sort((a,b) => (a['name'] > b['name']) ? 1 : ((b['name'] > a['name']) ? -1 : 0))

                                    return countries.map(country => {
                                        return (
                                            <TouchableOpacity
                                                key = {country['name']}
                                                onPress = {() => alert(`You are selecting "${country['name']}"`)}
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
                                                    {country['name']}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            }
                        </DataContext.Consumer>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}
import React, { Component } from 'react'

import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

export default class extends Component {
    state = {
        countries: [],
        pickedRegion: null,
        regions: [],
        showingState: 'Regions'
    }

    mainColor = 'steelblue'

    componentDidMount() {
        StatusBar.setBackgroundColor(this.mainColor)

        this.loadAllCountries()
    }

    render() {
        return (
            <View
                style = {{
                    flex: 1
                }}
            >
                <View
                    style = {{
                        backgroundColor: this.mainColor,
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
                        {this.state.showingState == 'Countries' ? this.state.pickedRegion : this.state.showingState}
                    </Text>
                </View>

                {this.showContent()}
            </View>
        )
    }

    loadAllCountries() {
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(resJson => {
            let countries = resJson

            this.setState({countries})

            this.getAllRegions(countries)
        })
    }

    getAllRegions(countries) {
        let regions = []

        for(const country of countries) {
            let regionName = country['region']

            if(!regions.includes(regionName)) {
                regions.push(regionName)
            }
        }

        this.setState({regions})
    }

    showContent() {
        let content = null

        if(this.state.showingState == 'Regions') {
            content = this.getRegionsListUI()
        } else if(this.state.showingState == 'Countries') {
            content = this.getCountriesListUI()
        }

        return (
            <ScrollView
                contentContainerStyle = {{
                    padding: 20
                }}
            >
                {content}
            </ScrollView>
        )
    }

    getRegionsListUI() {
        return (
            this.state.regions.map(item => {
                let regionName = item

                if(regionName == '') {
                    regionName = 'Other'
                }

                return (
                    <TouchableOpacity
                        key = {regionName}
                        onPress = {() => {
                            this.setState({
                                pickedRegion: item,
                                showingState: 'Countries'
                            })
                        }}
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

    getCountriesListUI() {
        return (
            this.state.countries.filter(item => item['region'] == this.state.pickedRegion).map(item => {
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
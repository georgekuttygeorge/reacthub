import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { FEED } from '../../../config/endpoints'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: null
        }
    }

    componentDidMount() {
        fetch(FEED)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.feed
                })
            })
    }

    renderItem({ item }) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 10, backgroundColor: 'white', borderRadius: 5, margin: 10, elevation: 3 }}>
                    <View style={{ flexDirection: 'row', flex: 3, padding: 10 }}>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Image source={{ uri: item.profilePic }} style={{ height: 70, width: 80 }} />
                        </View>
                        <View style={{ flex: 7 }}>
                            <Text style={{ textAlign: 'left', fontSize: 15, color: '#000000' }}>{item.name}</Text>
                            <Text style={{ color: '#717171' }}>22 hours ago</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ textAlign: 'left', color: '#000000' }}>{item.status}</Text>
                        <Text style={{ textAlign: 'left', color: '#14B0F0', textDecorationLine: 'underline' }}>{item.url}</Text>
                    </View>
                    <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10 }}>
                        <Image source={{ uri: item.image }} style={{ height: 130, width: '100%' }} />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        size={50}
                        color='black'
                    />
                </View>
            )
        }
        return (
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar backgroundColor='#285A67' barStyle='default' />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#EBEBEB'
    }
})
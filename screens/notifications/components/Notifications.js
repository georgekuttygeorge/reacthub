import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { NOTIFICATION } from '../../../config/endpoints'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: null
        }
    }

    componentDidMount() {
        let token = this.props.user.token
        return fetch(NOTIFICATION, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    this.setState({
                        isLoading: false,
                        dataSource: responseJson
                    })
                }
            })
    }

    renderItem({ item }) {
        return (
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photo }} style={styles.image} />
                </View>
                <View style={styles.textConatiner}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.timeContainer}>
                        <Icon name='clock-outline' size={15} />
                        <Text style={styles.time}>{item.created_at}</Text>
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

const mapStateToProps = (state) => ({
    user: state.login.user
})

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#EBEBEB'
    },
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        padding: 5,
        elevation: 3
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    textConatiner: {
        flex: 8,
        paddingLeft: 5
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        color: '#000000',
        fontWeight: '500'
    },
    description: {
        fontSize: 15,
        color: '#000000',
        textAlign: 'left'
    },
    timeContainer: {
        flexDirection: 'row',
        paddingTop: 5
    },
    time: {
        paddingLeft: 5,
        color: '#ACACAC',
        fontSize: 12
    }
})
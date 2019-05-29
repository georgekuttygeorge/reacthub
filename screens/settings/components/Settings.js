import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { PROFILE } from '../../../config/endpoints'
import { userLogout } from '../../../actions/actions'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            profile: null
        }
        this.onLogout = this.onLogout.bind(this)
    }

    static getDerivedStateFromProps(props) {
        if (props.user === null) {
            const resetAction = StackActions.reset({
                key: null,
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            })
            props.navigation.dispatch(resetAction)
        }
        return null
    }

    componentDidMount() {
        let token = this.props.user.token
        return fetch(PROFILE, {
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
                this.setState({
                    isLoading: false,
                    profile: responseJson.data
                })
            })
    }

    onLogout() {
        this.props.dispatch(userLogout())
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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image source={require('../../../assets/user.png')} style={styles.image} />
                    <Text style={styles.name}>{this.state.profile.name}</Text>
                    <Text style={styles.email}>{this.state.profile.email}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={this.onLogout} >
                        <Text style={styles.logout}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#FFFFFF'
    },
    header: {
        flex: 1,
        paddingTop: 10
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 32,
        color: '#929292',
        fontWeight: 'bold'
    },
    profileContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100,
    },
    name: {
        fontSize: 32,
        color: '#4A4A4A',
        fontWeight: 'bold',
        paddingTop: 15
    },
    email: {
        fontSize: 20,
        color: '#929292',
        fontWeight: 'bold',
        paddingTop: 5
    },
    footer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '50%',
        borderRadius: 5,
        backgroundColor: '#23454E',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    logout: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    }
})
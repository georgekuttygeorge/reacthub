import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet } from 'react-native'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

class App extends Component {

    componentDidMount() {
        if (this.props.loading)
            return true
        if (this.props.user && this.props.user.token) {
            const resetAction = StackActions.reset({
                key: null,
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            })
            this.props.navigation.dispatch(resetAction)
        }
        else {
            const resetAction = StackActions.reset({
                key: null,
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#285A67' barStyle='default' />
                <Image source={require('../../../assets/hub.png')} style={styles.image} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user
})

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#285A67',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '100%',
        width: '70%',
        resizeMode: 'contain'
    }
})
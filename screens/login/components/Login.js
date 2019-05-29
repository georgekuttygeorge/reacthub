import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, } from 'react-native'
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { userLogin, resetUser } from '../../../actions/actions'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
        }
        this.onLogin = this.onLogin.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(resetUser())
    }

    static getDerivedStateFromProps(props) {
        if (props.user && props.user.token) {
            const resetAction = StackActions.reset({
                key: null,
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            })
            props.navigation.dispatch(resetAction)
        }
        return null
    }

    onLogin() {
        if (this.state.email && this.state.email.length > 0 && this.state.password && this.state.password.length > 0) {
            this.props.dispatch(userLogin({ email: this.state.email, password: this.state.password }))
        }
        else
            Alert.alert('Fields cannot be empty')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#285A67' barStyle='default' />
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/hub.png')} style={styles.image} />
                </View>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                    <View style={styles.input}>
                        <View style={styles.rectangle}>
                            <Icon name='user' color='black' size={24} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='EMAIL'
                                placeholderTextColor='#B5B5B5'
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                        </View>
                        <View style={styles.rectangle}>
                            <Icon name='lock' color='black' size={24} />
                            <TextInput
                                style={styles.textInput}
                                placeholder='PASSWORD'
                                placeholderTextColor='#B5B5B5'
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                        <Text style={styles.loginText}>{this.props.isLoading ? 'LOGING IN...' : 'LOGIN'}</Text>
                    </TouchableOpacity>
                    <View style={styles.register}>
                        <Text style={styles.text}>Not a Member? <Text style={styles.registerText} onPress={() => this.props.navigation.navigate('Register')}> Register Now</Text></Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    isLoading: state.login.isLoading,
    error: state.login.error
})

export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#285A67',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '50%',
        width: '50%',
        resizeMode: 'contain'
    },
    input: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rectangle: {
        width: '90%',
        height: '20%',
        backgroundColor: '#23454E',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    textInput: {
        fontSize: 16,
        paddingLeft: 10,
        color: '#B5B5B5',
        width: '90%'
    },
    footer: {
        flex: 1,
        alignItems: 'center',
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
    loginText: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: 'bold'
    },
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#B5B5B5',
        textAlign: 'center'
    },
    registerText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: "center",
        textDecorationLine: 'underline'
    }
})
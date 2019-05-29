import React, { Component } from 'react'
import { StatusBar, Image, StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { REGISTER } from '../../../config/endpoints'

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            password: null,
            isLoading: false
        }
        this.onRegister = this.onRegister.bind(this)
    }

    onRegister() {
        if (this.state.name && this.state.name.length > 0 && this.state.email && this.state.email.length > 0 && this.state.password && this.state.password.length > 0) {
            this.setState({ isLoading: true })
            return fetch(REGISTER, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.status) {
                        this.setState({ isLoading: false })
                        Alert.alert('User Registration Successs',
                            '',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
                            ],
                            { cancelable: false },
                        )
                    }
                    else {
                        this.setState({ isLoading: false })
                        Alert.alert(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
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
                                placeholder='NAME'
                                placeholderTextColor='#B5B5B5'
                                onChangeText={(text) => this.setState({ name: text })}
                            />
                        </View>
                        <View style={styles.rectangle}>
                            <Icon name='mail' color='black' size={24} />
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
                    <TouchableOpacity style={styles.button} onPress={this.onRegister}>
                        <Text style={styles.loginText}>{this.state.isLoading ? 'REGISTERING...' : 'REGISTER'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

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
})
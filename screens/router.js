import React from 'react'
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Ionicons'

import SplashScreen from './splashScreen/index'
import Login from './login/index'
import Register from './register/index'
import Feed from './feed/index'
import Notifications from './notifications/index'
import Settings from './settings/index'

const BottomTab = createBottomTabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused
                    ? <Icons name='feed' size={24} color='#285A67' />
                    : <Icons name='feed' size={24} color='#717171' />
            )
        }
    },
    Notification: {
        screen: Notifications,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused
                    ? <Icon name='md-notifications' size={24} color='#285A67' />
                    : <Icon name='md-notifications' size={24} color='#717171' />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                focused
                    ? <Icon name='md-settings' size={24} color='#285A67' />
                    : <Icon name='md-settings' size={24} color='#717171' />
            )
        }
    },
},
    {
        tabBarOptions: {
            activeTintColor: '#285A67',
            inactiveTintColor: '#717171',
            showLabel: true,
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            backBehavior: 'none',
        },
    }
)

const AppStack = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Home: {
        screen: BottomTab
    }
},
    {
        initialRouteName: 'SplashScreen',
        headerMode: 'none'
    }
)

export default createAppContainer(AppStack)
import Api from '../lib/api'
import { LOGIN } from '../config/endpoints'
import { Alert } from 'react-native'

export function userLogin(body) {
    return function (dispatch) {
        dispatch({ type: 'USER_LOGIN' })

        Api('post', LOGIN, body)
            .then((response) => {
                if (response.status === true) {
                    dispatch({ data: response.data, type: 'USER_LOGIN_SUCCESS' })
                }
                else {
                    dispatch({ type: 'USER_LOGIN_FAILURE' })
                    Alert.alert(response.message)
                }
            }
            )
    }
}

export function resetUser() {
    return { type: 'RESET_USER' }
}

export function userLogout() {
    return { type: 'USER_LOGOUT' }
}
let initialStage = {
    user: null,
    error: false,
    isLoading: false,
}

const login = (state = initialStage, actions) => {
    switch (actions.type) {
        case 'USER_LOGIN':
            return { ...state, isLoading: true, error: false }
            break;
        case 'USER_LOGIN_SUCCESS':
            return { ...state, isLoading: false, user: actions.data }
            break;
        case 'USER_LOGIN_FAILURE':
            return { ...state, isLoading: false, error: true, }
            break;
        case 'RESET_USER':
            return { ...state, isLoading: false, error: false, user: null }
            break;
        case 'USER_LOGOUT':
            return initialStage
            break;
        default:
            return state
    }
}

export default login
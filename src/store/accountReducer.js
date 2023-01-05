// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    token: null,
    componente: null,
    user: null
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user, token } = action.payload;
            return {
                ...state,
                token,
                user
            };
        }
        case LOGIN: {
            const { login, token, componente } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                token,
                user: login,
                componente
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                token: null,
                componente: [],
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;

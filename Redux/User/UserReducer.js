import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    SET_USER_FITNESS_DATA,
    SET_STEPS
} from "./UserTypes";


const initialState = {
    data: {},
    loading: false,
    logged: false,
    error: null,
    currentUser: {},
    userFitnessData: {},
    setSteps:{}
};


const userReducer = (state = initialState, action) => {
    const { payload, type,steps } = action;
    console.log(action,'actions')
    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                data: payload,
                logged: true,
                loading: false,
            };
        case SET_USER_FITNESS_DATA:
            return {
                ...state,
                userFitnessData: payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: payload,
                error: null,
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_LOGOUT:
            return {
                ...state,
                data: {},
                logged: false,
                loading: false,
            };
        case SET_STEPS:
            return {
                ...state,steps
            }
        default:
            return state;
    }
}


export default userReducer;
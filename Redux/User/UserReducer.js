import { setDistance } from "./UserAction";
import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    SET_USER_FITNESS_DATA,
    SET_STEPS,
    SET_CALORIES,
    SET_DISTANCE,
    SET_HEART_POINT,
    SET_ACCESS_TOKEN,

    
} from "./UserTypes";


const initialState = {
    data: {},
    loading: false,
    logged: false,
    error: null,
    currentUser: {},
    userFitnessData: {},
    setSteps:{},
    setCalories:{},
    setDistance:{},
    SetHeartPoint:{},
    setAccessToken:{},
};


const userReducer = (state = initialState, action) => {
    const { payload, type,steps,calories,distance,heartpoint,accesstoken } = action;
  //  console.log(action,'actions')
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
            };
        case SET_CALORIES:
            return{
                ...state,calories
            }    
        case SET_DISTANCE:
            return{
                ...state,distance
            } 
        case SET_HEART_POINT:
            return{
                ...state,heartpoint
            }   
        case SET_ACCESS_TOKEN:
            return{
                ...state,accesstoken
            }         
        default:
            return state;
    }
}


export default userReducer;
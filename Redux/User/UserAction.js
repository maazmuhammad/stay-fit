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
    LOGIN_TYPE,
} from "./UserTypes";
import axios from "axios";
import moment from "moment";
//import { moment } from 'react-native';
//import Moment from 'react-moment'
// import { collection, getDocs } from "firebase/firestore"


export const setUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const setUserFiteness = (fitnessData) => {
    return {
        type: SET_USER_FITNESS_DATA,
        payload: fitnessData
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};


export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const setSteps = (steps) => {
    return {
        type: SET_STEPS,
        steps,
    }
}
export const setCalories = (calories) => {
    return {
        type: SET_CALORIES,
        calories,
    }
}
export const setDistance = (distance) => {
    return {
        type: SET_DISTANCE,
        distance,
    }
}
export const SetHeartPoint = (heartpoint) => {
    return {
        type: SET_HEART_POINT,
        heartpoint,
    }
}
export const setAccessToken = (accesstoken) => {
    return {
        type: SET_ACCESS_TOKEN,
        accesstoken,
    }
}

export const setLoginType = (loginType) => {
    return {
        type: LOGIN_TYPE,
        loginType,
    }
}





export const GetUserFitnessData = (token) => {
    return async dispatch => {
        //console.log(token, "token")
       // console.log(moment().startOf('day').format('x'), 'start date');
       // console.log(moment().endOf('day').format('x'), 'end date');

        try {
            dispatch(setLoading(true));
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaaa: ', token)
            // const data = await axios({
            //     method: 'POST',
            //     url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: {

            //         "aggregateBy": [
            //             {
            //                 "dataTypeName": "com.google.step_count.delta",
            //                 "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            //             }
            //         ],
            //         "bucketByTime": {
            //             "durationMillis": 86400000
            //         },
            //         "endTimeMillis": 1668612900000,
            //         "startTimeMillis": 1668440100000

            //     }
            // })

            const { data } = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
                {
                    "aggregateBy": [
                        {
                            "dataTypeName": "com.google.step_count.delta",
                            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                        },
                        {
                            "dataTypeName": "com.google.calories.expended",
                            "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended"
                        },
                        {
                            "dataTypeName": "com.google.distance.delta",
                            "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta"
                        },
                        {
                            "dataTypeName": "com.google.heart_minutes",
                            "dataSourceId": "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes"
                        }
                    ],

                    "bucketByTime": {
                        "durationMillis": 86400000
                    },
                    // "endTimeMillis": 1670266799999,
                    // "startTimeMillis": 1670180400000

                    "endTimeMillis": moment().endOf('day').format('x'),
                    "startTimeMillis": moment().startOf('day').format('x')









                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

            );

            // console.log(data, 'Google  Fit API data')

            // console.log("Steps",data.bucket[0].dataset[0].point[0].value[0].intVal)
            // console.log("Cal",data.bucket[0].dataset[1].point[0].value[0].fpVal)
            // console.log("Distance",data.bucket[0].dataset[2].point[0].value[0].fpVal)
            // console.log("Heart Point",data.bucket[0].dataset[3].point[0].value[0].fpVal)

            dispatch(setSteps(data.bucket[0].dataset[0].point[0].value[0].intVal))
            dispatch(setCalories(data.bucket[0].dataset[1].point[0].value[0].fpVal))
            dispatch(setDistance(data.bucket[0].dataset[2].point[0].value[0].fpVal))
            dispatch(SetHeartPoint(data.bucket[0].dataset[3].point[0].value[0].fpVal))





        } catch (err) {
            console.log("Access token error hai", err)
            dispatch(setLoading(false));
        }
    }
};
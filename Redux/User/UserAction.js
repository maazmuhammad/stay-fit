import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    SET_USER_FITNESS_DATA,
    SET_STEPS
} from "./UserTypes";
import axios from "axios";

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

export const setSteps=(steps)=>{
    return{
        type: SET_STEPS,
        steps,
    }
}



export const GetUserFitnessData = (token) => {
    return async dispatch => {
        console.log(token, "token")
        try {
            dispatch(setLoading(true));
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaa: ', token)
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

            const {data} = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
                {
                    "aggregateBy": [
                        {
                            "dataTypeName": "com.google.step_count.delta",
                            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                        }
                    ],
                    "bucketByTime": {
                        "durationMillis": 86400000
                    },
                    "endTimeMillis": 1668612900000,
                    "startTimeMillis": 1668440100000,

                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                
            );

            console.log(data, 'steps data')

            console.log(data.bucket[0].dataset[0].point[0].value[0].intVal)
            dispatch(setSteps(data.bucket[0].dataset[0].point[0].value[0].intVal))


        } catch (err) {
            console.log("fitness Data err", err)
            dispatch(setLoading(false));
        }
    }
};
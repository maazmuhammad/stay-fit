import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Image, Text, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    ProgressChart,
    BarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import 'react-native-gesture-handler';

import { connect } from "react-redux";
import { GetUserFitnessData } from "../Redux/User/UserAction"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';








const Home = (props) => {
    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["Run"], // optional
        data: [(props?.steps || 0) / 10000]
    };
    const data1 = {
        labels: ["12:00 am", "6:00 am", "12:00 pm", "6:00 pm"],
        datasets: [
            {
                data: [(props?.steps || 0) / 10000]
            }
        ]
    };



    const navigation = useNavigation();


    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#AAEAFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 75, 173,${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional

    };

    const graphStyle = {
        //marginVertical: 80,
        ...chartConfig.style
    };

    const back = () => {
        // GoogleSignin.signOut()
        navigation.navigate('Home1')





    }








    useEffect(() => {

        props.GetFitnessData(props.accesstoken)
        // RefreshTokentoAcessToken()


        // console.log(props.calories, 'calories')
    }, []);



    return (

        <View style={styles.container}>
            <View style={{ backgroundColor: '#AAEAFF' }}>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#004aad', width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, padding: '3%' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable style={{}}
                                onPress={() => navigation.openDrawer()}
                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/menu.png')}
                                />

                            </Pressable>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>Activity Summary</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ height: 250, width: '90%', marginTop: 20, marginBottom: 20, alignContent: 'center' }}>
                <ProgressChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    strokeWidth={50}
                    radius={90}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />

            </View>


            <View style={{ backgroundColor: '#004aad', height: 80, width: '90%', borderRadius: 8, marginHorizontal: 10, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            marginTop: 15,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/footprint.png')}
                    />
                    <Text style={{
                        fontSize: 30, fontWeight: 'bold', color: '#AAEAFF', paddingLeft: 10, textAlign: 'center', marginHorizontal: 10,
                    }}>
                        {props.steps}

                    </Text>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#AAEAFF' }}>
                        Steps
                    </Text>
                </View>
            </View>

            <View style={{ backgroundColor: '#004aad', height: 80, width: "90%", borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        marginTop: 10,
                        marginHorizontal: 10,
                    }}
                    source={require('../assests/image/heart1.png')}
                />
                {
                    props?.heartpoint
                    &&

                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', }}>
                        {props.heartpoint} pts
                    </Text>
                }

            </View>
            <View style={{ backgroundColor: '#004aad', height: 80, width: "90%", borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        marginTop: 10,
                        marginHorizontal: 10,
                    }}
                    source={require('../assests/image/calories.png')}
                />

                {
                    props?.calories
                    &&
                    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 10, color: '#AAEAFF', textAlign: 'center', marginHorizontal: 10 }}>

                        {(props.calories).toFixed()}
                    </Text>
                }
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#AAEAFF' }}>
                    Calories
                </Text>


            </View>
            <View style={{ backgroundColor: '#004aad', height: 80, width: "90%", borderRadius: 8, flexDirection: 'row', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        marginTop: 10,
                        marginHorizontal: 10,
                    }}
                    source={require('../assests/image/distance.png')}
                />

                
            {props?.distance
                &&

                <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: '#AAEAFF', marginHorizontal: 10}}>
                    {(props.distance).toFixed()} m
                </Text>
            }
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#AAEAFF' }}>
                    Distance
                </Text>


            </View>









        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
        backgroundColor: '#AAEAFF',



    },
    button: {
        width: 30,
        height: 30,
        //marginTop: 10,
        //marginBottom: 10,
        marginHorizontal: 30,
        left: 300,
        // backgroundColor: 'orange'

    },
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        // marginHorizontal: 30,
        //backgroundColor: 'orange'
    },

})
const mapStateToProps = (store) => (
    {
        loading: store.user.loading,
        steps: store.user.steps,
        calories: store.user.calories,
        distance: store.user.distance,
        heartpoint: store.user.heartpoint,
        accesstoken: store.user.accesstoken,



    }
);





const mapDispatchToProps = (dispatch) => ({
    GetFitnessData: (token) => dispatch(GetUserFitnessData(token))



});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
//export default Home;


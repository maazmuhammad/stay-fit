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
        data: [(props?.steps||0)/10000]
    };
    const data1 = {
        labels: ["12:00 am", "6:00 am", "12:00 pm", "6:00 pm"],
        datasets: [
            {
                data: [(props?.steps||0)/10000]
            }
        ]
    };



    const navigation = useNavigation();


    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(248, 18, 80,${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
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
            <View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#F81250', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable style={{ right: 20 }}
                                onPress={() => navigation.openDrawer()}
                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/menu.png')}
                                />

                            </Pressable>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: 'white', right: 25, }}>Activity Summary</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ marginTop: 20 }}>
                <View style={{ height: 300 }}>


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
                <View style={{ top: -30 }} >


                    <BarChart
                        style={graphStyle}
                        data={data1}
                        width={screenWidth}
                        height={160}
                        chartConfig={chartConfig}

                    />

                </View>
            </View>


            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>
                        Steps:



                    </Text>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', paddingLeft: 10, }}>
                        {props.steps}



                    </Text>
                </View>

                <View style={{ backgroundColor: 'red', height: 60, width: 150, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            marginTop: 10,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/heart.png')}
                    />
                    {
                        props?.heartpoint
                        &&

                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', }}>
                            {props.heartpoint}
                        </Text>
                    }
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: "center", }}>
                        pts



                    </Text>

                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginHorizontal: 15 }}>
                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, marginTop: 10, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Calories:

                    </Text>
                    {
                        props?.calories
                        &&
                        <Text style={{ fontSize: 26, fontWeight: 'bold', paddingLeft: 10, color: 'white', }}>

                            {(props.calories).toFixed()}
                        </Text>
                    }
                </View>

                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, marginTop: 10, borderRadius: 8, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Distance:</Text>
                    <View style={{ flexDirection: 'row', textAlign: 'center' }}>

                        {props?.distance
                            &&

                            <Text style={{ fontSize: 26, fontWeight: 'bold', paddingLeft: 10, color: 'white', }}>
                                {(props.distance).toFixed()}
                            </Text>
                        }
                        <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white', }}>
                            m
                        </Text>
                    </View>


                </View>
            </View>


            <Button color='#F81250' title="BACK" onPress={() => back()} />
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',



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
        width: 30,
        height: 30,
        marginTop: 10,

        marginHorizontal: 30,



        //  backgroundColor: 'orange'
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


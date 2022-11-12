import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Keyboard, Pressable, Touchable } from 'react-native';
import { TextInput, Button, } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import {
    ProgressChart,
    BarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import 'react-native-gesture-handler';








const Home = () => {
    // const [user, setState] = useState('');
    const [UserData, setUserData] = useState({});
    const screenWidth = Dimensions.get("window").width

    const data = {
        labels: ["Run"], // optional
        data: [0.4]
    };
    const data1 = {
        labels: ["12:00 am", "6:00 am", "12:00 pm", "6:00 pm"],
        datasets: [
            {
                data: [ 0.7, 0.1, 0.9, 0.3, 0.5]
            }
        ]
    };



    const navigation = useNavigation();

    const OnNavigateHome1 = async () => {
        navigation.navigate('Home1');


    }
    const OnLogoutPressed = async () => {

        try {
            // await GoogleSignin.hasPlayServices();
            // const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });

            GoogleSignin.signOut();
            auth().signOut();
            console.log("Sign out successfull")

            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('Login');



    }
    const onCalendar = async () => {

    }
    const onDrawer = async () => {



    }

    const chartConfig = {
       // backgroundGradientFrom: "black",
       // backgroundGradientFromOpacity: 1,
       // backgroundGradientTo: "black",
        //backgroundGradientToOpacity: 0.5,
        color: (opacity = 2) => `rgba(248, 18, 80,${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.2,
        //useShadowColorFromDataset: false // optional
    };
    const graphStyle = {
        //marginVertical: 80,
        ...chartConfig.style
    };

    return (

        <View style={styles.container}>
            <View>
                {/* <Pressable style={{ backgroundColor: 'black' }}
            onPress={()=>navigation.openDrawer()}
            >
                <Image
                    style={styles.button1}
                    source={require('../assests/image/menu.png')}
                />

            </Pressable>

                <Pressable
                    onPress={() => onCalendar()}>
                    <Image
                        style={styles.button}
                        source={require('../assests/image/calendar.png')}
                    />

                </Pressable> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#F81250', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable style={{ right: 20}}
                                onPress={() => navigation.openDrawer()}
                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/menu.png')}
                                />

                            </Pressable>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', paddingLeft: 10, color: 'white' ,right:22}}>Activity Summary</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ marginTop:10 }}>
                <View style={{ height: 300 }}>


                    <ProgressChart
                        data={data}
                        width={screenWidth}
                        height={250}
                        strokeWidth={50}
                        radius={100}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
                <View style={{ top:-30}} >


                <BarChart
                    style={graphStyle}
                    data={data1}
                    width={screenWidth}
                    height={160}
                    chartConfig={chartConfig}
                    
                    />

                    </View>
            </View>

            {/* <View>
                <View>{setUserData.photoURL}</View>
                <Text>NAME:MUHAMMAD MAAZ<Text>{setUserData.displayNAME}</Text></Text>
                <Text>UID:9906<Text>{setUserData.uid}</Text></Text>
                <Text>Email:maazmuhammad88@gmail.com<Text>{setUserData.email}</Text></Text>


            </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' , marginHorizontal:30  }}>
                <View style={{ backgroundColor: '#ff6666', height: 60, width: 150, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, }}>MOVE:</Text>
                </View>

                <View style={{ backgroundColor: 'red', height: 60, width: 150, borderRadius: 8, }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            marginTop: 10,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/heart.png')}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginHorizontal:30 }}>
                <View style={{ backgroundColor: '#ff6666', height: 60, width: 150, marginTop: 10, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, }}>Steps:</Text>
                </View>

                <View style={{ backgroundColor: '#ff6666', height: 60, width: 150, marginTop: 10, borderRadius: 8, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, }}>Distance:</Text>

                </View>
            </View>

            {/* <Button style={{width:'90%'}} title="Logout" color="red"  /> */}
            {/* <Button title="Logout" onPress={() => OnLogoutPressed()} style={{ width: "90%", marginTop: 10,backgroundColor: '#b30000',marginLeft:20  }} /> */}
            <Button title="View More" onPress={() => OnNavigateHome1()} style={{ width: "80%",  backgroundColor: '#b30000', marginLeft: 40,  }} />
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

export default Home;


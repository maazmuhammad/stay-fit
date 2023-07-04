import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Pressable, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { setAccessToken } from '../Redux/User/UserAction';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });




GoogleSignin.configure();
GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.blood_glucose.read',
        'https://www.googleapis.com/auth/fitness.blood_pressure.read',
        'https://www.googleapis.com/auth/fitness.body.read',
        'https://www.googleapis.com/auth/fitness.body_temperature.read',
        'https://www.googleapis.com/auth/fitness.heart_rate.read',
        'https://www.googleapis.com/auth/fitness.location.read',
        'https://www.googleapis.com/auth/fitness.nutrition.read',
        'https://www.googleapis.com/auth/fitness.oxygen_saturation.read',
        'https://www.googleapis.com/auth/fitness.reproductive_health.read',
        'https://www.googleapis.com/auth/fitness.sleep.read'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '514041579955-gf0mbnocm2u0qdk4mmmef2berpc4ksi1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});


const Home1 = (props) => {

    // useEffect(() => {
       
        
    // }, [])


    const navigation = useNavigation();
    // const Dnav = useDrawerNav();







    const signIn = async () => {
        try {
           await GoogleSignin.hasPlayServices();
            if (props.loginType === 'GOOGLE') {
                const userInfo = await GoogleSignin.getTokens();
                console.log(userInfo.accessToken, 'userInfo check 2')
                props.setAccessToken(userInfo.accessToken)
                navigation.navigate("Home")
            }
            else {
                await GoogleSignin.hasPlayServices();
                const { idToken } = await GoogleSignin.signIn()
                if (idToken) {
                    const userInfo = await GoogleSignin.getTokens();
                     console.log(userInfo.accessToken, 'userInfo check 3')
                    props.setAccessToken(userInfo.accessToken)
                    navigation.navigate("Home")
                }
            }


            //     const _data = await axios.post(`https://oauth2.googleapis.com/token?client_id=514041579955-gf0mbnocm2u0qdk4mmmef2berpc4ksi1.apps.googleusercontent.com&client_secret=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&code=${userInfo.serverAuthCode}&grant_type=authorization_code`)
            //     console.log(_data?.data.refresh_token)

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error, error.code, error.message,"check1")
            }
        }
        //  navigation.navigate('Home')
    };
    const back = () => {
        GoogleSignin.signOut()




    }



    const navigatetoSmartNutrition = () => {
        navigation.navigate('Smart')


    }
    const OnLogoutPressed = () => {

        navigation.navigate('Login')


    }
    return (


        <View style={{ flex: 1, }}>

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
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>Home</Text>
                        </View>
                    </View>
                </View>

            </View>






            <View style={styles.screen}>
                <TouchableOpacity
                    onPress={() => signIn()}
                    style={styles.roundButton2}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            //marginHorizontal: 10,
                        }}
                        source={require('../assests/image/lifestyle.png')}
                    />
                    <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 'bold', color: '#AAEAFF', textAlign: 'center' }}>Activity Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigatetoSmartNutrition()}
                    style={styles.roundButton2}>
                        <Image
                        style={{
                            width: 100,
                            height: 100,
                            //marginHorizontal: 10,
                        }}
                        source={require('../assests/image/nutritionist.png')}
                    />
                    <Text style={{ fontSize: 24, textAlign: "center", fontWeight: 'bold', color: '#AAEAFF', textAlign: 'center' }}>Smart Nutritionist</Text>
                </TouchableOpacity>

            </View>
            {/* <Button color='#F81250' title="Logout" onPress={() => back()} /> */}



        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AAEAFF'
    },

    roundButton2: {
        marginTop: 20,
        width: '80%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#004aad',
        elevation: 20,

    },
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        // marginHorizontal: 30,
        //backgroundColor: 'orange'
    },


})
// export default Home1;

const mapStateToProps = (store) => (
    {
        loginType: store.loginType
    }
);

const mapDispatchToProps = (dispatch) => ({
    setAccessToken: (token) => dispatch(setAccessToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home1);


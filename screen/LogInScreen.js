import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Keyboard, Pressable, ActivityIndicator, } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import RegisterSrcee from '../screen/RegisterScree';
import { useNavigation } from '@react-navigation/native';
import MyModal from '../component/modal';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';







const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/


const LogInScreen = () => {
    const inputRef = useRef(null)
    const emailinputRef = useRef(null)
    const [Password, setPassword] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [useData, setUserData] = useState({});
    const [userData, setUseData] = useState({})
    const [modalVisible, setModalVisible] = React.useState(false);



    const navigation = useNavigation();
    // const OnLoginPressed = async (Email, Password) => {
    //     navigation.navigate('Home1')
    // }


    const OnLoginPressed = async (Email, Password) => {
        console.log(Email, Password)
        if (!Email.match(EMAIL_REGEX)) {

            alert("Please enter valid email")
        }
        else if (Email?.trim().length == 0) {
            alert("Please enter email")
        }
        else if (!Password.match(Password_REGEX)) {
            alert("Invalid Password")
        }
        else {
            auth().signInWithEmailAndPassword(Email, Password)
                .then(() => {


                    console.log("login successful")
                    // navigation.navigate('Home1');
                    emailinputRef.current.clear()
                    inputRef.current.clear()
                    setEmail("")
                    setPassword("")






                })

                .catch((e => console.log(e)))
        }








    }
    const OnRegisterPressed = () => {

        navigation.navigate('Register')

    }
    const OnForgetPasswordPressed = () => {


        if (Email?.trim().length == 0) {
            alert("please enter email")
        }
        else if (!Email.match(EMAIL_REGEX)) {

            alert("please enter valid email")
        }
        else {
            auth().sendPasswordResetEmail(Email)
                .then(() => {
                    setModalVisible(true)

                }).catch(e => console.log(e))


        }
    }
    const onFacebookButtonPress = async () => {
        try {

            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
        } catch {
            (e => console.log(e))
        }

    }
    const onGoogleButtonPress = async () => {
        try {

            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        }
        catch {
            (e => console.log(e))
        }


    }
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '514041579955-e0rfnochttan679vtf5i6ciu05ggdqb9.apps.googleusercontent.com',

        });
    }, [])


    return (
        <>
            <View style={styles.container}>
                <View style={{ backgroundColor: 'white' }} >

                    <Image source={require('../assests/image/logo.jpg')}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                </View>


                <View style={{}}>
                    <Text style={styles.text1}>WHAT SEEMS HARD NOW WILL ONE DAY BE,</Text>
                    <Text style={styles.text2}>YOUR WARM-UP</Text>
                </View>

                <TextInput variant="outlined"
                    ref={emailinputRef}
                    keyboardType='Email'
                    placeholder='Email'
                    onChangeText={(Email) => setEmail(Email)}
                    style={{ width: "90%", marginTop: 20, }}
                />

                <TextInput variant="outlined" placeholder='Password' secureTextEntry={true}
                    ref={inputRef}
                    onChangeText={(Password) => setPassword(Password)} style={{
                        width
                            : "90%", marginTop: 5,
                    }} />



                <Button variant="text" title="Forget Password?" color="#b30000" onPress={() => OnForgetPasswordPressed()} style={{ left: 100, }} />




                <Button title="Login" onPress={() => OnLoginPressed(Email, Password)} style={{ width: "90%", marginTop: 10, backgroundColor: '#b30000', }} />
                <Text style={styles.text3}>OR LOGIN WITH</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <TouchableOpacity onPress={() => FacebookServices()}>
                        <Image
                            style={styles.button}
                            source={require('../assests/image/facebook.png')}
                        />
                    </TouchableOpacity> */}

                    {/* <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => {
                        console.log('Signed in with Google!')
                        navigation.navigate('Home');
                        })}>
                        <Image
                            style={styles.button}
                            source={require('../assests/image/google.png')}
                        />
                    </TouchableOpacity> */}

                    <Pressable
                        onPress={() => onGoogleButtonPress()
                            .then(res => {
                                console.log(res.user);
                                setUserData(res.user);
                               // navigation.navigate('Home1');
                            })
                            .catch(
                                error => console.error(error))
                        }>
                        <Image
                            style={styles.button}
                            source={require('../assests/image/google.png')}
                        />

                    </Pressable>

                    <Pressable
                        onPress={() => onFacebookButtonPress()
                            .then(res => {
                                //console.log(res.data);
                                setUseData(res.data);
                               // navigation.navigate('Home1');
                            })
                            .catch(
                                error => console.error(error))
                        }>
                        <Image
                            style={styles.button}
                            source={require('../assests/image/facebook.png')}
                        />

                    </Pressable>

                </View>




                <Text style={{ fontSize: 16, fontWeight: 'bold', margintop: 10, marginBottom: 20, color: '#ff6666', }}>Learn</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#ff6666' }} >New to Stay-Fit?</Text>
                    {/* <Button variant="text" title="Register" onPress={() => OnRegisterPressed()}  style={{fontSize: 16,  fontWeight: 'bold',}}/> */}
                    <Button variant="text" title="Register" color="#b30000" fontWeight="bold" onPress={() => OnRegisterPressed()} />
                </View>



            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <MyModal email={Email} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <View style={{ backgroundColor: "orange", width: 200, height: 200, justifyContent: 'center' }}>
                        <Text>{Email}</Text>
                    </View>
                </MyModal>

            </View>
        </>
    )





}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container1: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
        marginTop: 20,

    },
    button: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,

        //backgroundColor:'orange'
    },
    text1: {
        fontSize: 15,
        color: '#ff6666',
        fontWeight: 'bold',

    },
    text2: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 25,
        color: '#b30000',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text3: {
        fontSize: 16,
        color: '#ff6666',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,




    },
    input: {
        padding: 10,
        margin: 15,
        // height: 45,
        borderColor: '#D9D9D9',
        borderWidth: 2,
        width: '90%',
        backgroundColor: '#D9D9D9',
    },




})
export default LogInScreen;

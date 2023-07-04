import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { TextInput, Button } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import MyModal from '../component/modal';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { setLoginType } from '../Redux/User/UserAction';
import { connect } from 'react-redux';

const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const LogInScreen = (props) => {
    const inputRef = useRef(null)
    const emailinputRef = useRef(null)
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [useData, setUserData] = useState({});
    const [userData, setUseData] = useState({})
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();

    const OnLoginPressed = async (Email, Password) => {
        console.log(Email, Password)
        // if (!Email.match(EMAIL_REGEX)) {
        //     alert("Please enter valid email")
        // }
        if (Email?.trim().length == 0) {
            alert("Please enter email")
        }
        // else if (!Password.match(Password_REGEX)) {
        //     alert("Invalid Password")
        // }
        if (Password?.trim().length == 0) {
            alert("Please enter password")
        }
        else {
            auth().signInWithEmailAndPassword(Email, Password)
                .then(() => {
                    console.log("login successful")
                    navigation.navigate('Home1');
                    emailinputRef.current.clear()
                    inputRef.current.clear()
                    setEmail("")
                    setPassword("")
                    props.setLoginType('PASSWORD');
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
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw 'User cancelled the login process';
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw 'Something went wrong obtaining access token';
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            return auth().signInWithCredential(facebookCredential);
        } catch {
            (e => console.log(e))
        }
    }

    const onGoogleButtonPresss = async () => {
        try {
            console.log("maaz")
            GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            console.log("maaz1")
            // Get the users ID token
            const  idToken  = await GoogleSignin.signIn();
            console.log(idToken, "chal ja")
            //  GoogleSignin.addScopes()
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log("maaz3")
            // Sign-in the user with the credential
            const respone = await auth().signInWithCredential(googleCredential);
            if (respone){
                setUserData(respone.user);
                props.setLoginType('GOOGLE');
                navigation.navigate('Home');
            }
           
        }
        catch {

            (e => console.log(e))
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "514041579955-e0rfnochttan679vtf5i6ciu05ggdqb9.apps.googleusercontent.com",
        });
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <View style={{}} >
                    <Image source={require('../assests/image/logo11.png')}
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
                    style={{
                        width: "90%", marginTop: 20,
                    }}
                />

                <TextInput variant="outlined" placeholder='Password' secureTextEntry={true}
                    ref={inputRef}
                    onChangeText={(Password) => setPassword(Password)} style={{
                        width: "90%", marginTop: 5,
                    }}
                />

                <Button variant="text" title="Forget Password?" color="#004aad"
                    onPress={() => OnForgetPasswordPressed()} style={{ left: 80, }}
                />

                <Button title="Login"
                    onPress={() => OnLoginPressed(Email, Password)} style={{ width: "90%", marginTop: 10, backgroundColor: '#004aad', }}
                />

                <Text style={styles.text3}>OR LOGIN WITH</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {/* GOOGLE BUTTON */}

                    <Pressable
                        onPress={() => onGoogleButtonPresss()
                            // .then(res => {
                            //   //  console.log(res.user);
                            //     // setUserData(res.user);
                            //     // props.setLoginType('GOOGLE');
                            //     // navigation.navigate('Home');
                            // })
                            // .catch(
                            //     error => console.error(error)) 

                        }>

                        <Image
                            style={styles.button}
                            source={require('../assests/image/google.png')}
                        />

                    </Pressable>

                    {/* FACEBOOK BUTTON */}

                    <Pressable
                        onPress={() => onFacebookButtonPress()
                            .then(res => {
                                console.log(res.data, "facebook user");
                                setUseData(res.data);
                                props.setLoginType('FACEBOOK');
                                navigation.navigate('Home1');
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




                <Text style={{ fontSize: 16, fontWeight: 'bold', margintop: 10, marginBottom: 20, color: '#004aad', }}>Learn</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#5d90d4', fontStyle: 'italic', fontWeight: 'bold', }} >New to STAY-FIT ?</Text>
                    {/* <Button variant="text" title="Register" onPress={() => OnRegisterPressed()}  style={{fontSize: 16,  fontWeight: 'bold',}}/> */}
                    <Button variant="text" title="Register" color="#004aad" fontWeight="bold" onPress={() => OnRegisterPressed()} />
                </View>



            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <MyModal email={Email} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    <View style={{ backgroundColor: "orange", width: 200, height: 200, justifyContent: 'center' }}>
                        <Text>{Email}</Text>
                    </View>
                </MyModal>

            </View>
        </View>
    )





}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //flex: 1,
        backgroundColor: 'white',
        height: '100%'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
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
        color: '#5d90d4',
        fontWeight: 'bold',

    },
    text2: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 25,
        color: '#004aad',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text3: {
        fontSize: 16,
        color: '#004aad',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        fontStyle: 'italic'




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

const mapStateToProps = (store) => (
    {}
);

const mapDispatchToProps = (dispatch) => ({
    setLoginType: (type) => dispatch(setLoginType(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
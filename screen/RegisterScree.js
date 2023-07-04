import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable, } from 'react-native';
import { TextInput, Button, Flex } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/






const RegisterSrcee = () => {

    const [Password, setPassword] = React.useState();
    const [Email, setEmail] = React.useState();
    const [Name, setName] = React.useState();
    const [useData, setUserData] = useState({});
    const [userData, setUseData] = useState({})
    const [modalVisible, setModalVisible] = React.useState(false);

    const navigation = useNavigation();




    const OnSigninPressed = () => {
        navigation.navigate('Login');

    }
    const OnCreateAccount = async (Email, Password) => {
        console.log(Email, Password)



        if (Name?.trim().length == 0) {
            alert("Please enter Full Name")

        }
        // else if (!Email.match(EMAIL_REGEX)) {

        //     alert("Please enter valid email")
        // }
        else if (Email?.trim().length == 0) {
            alert("Please enter email")
        }
        // else if (!Password.match(Password_REGEX)) {
        //     alert("Password Must Contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number and one special character")
        // }
        else {
            auth().createUserWithEmailAndPassword(Email, Password)
                .then(() => {

                    setEmail(" ")
                    setPassword(" ")
                    setName(" ")

                    navigation.navigate('Login');
                })
                .catch(e => console.log(e))
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




    return (
        <View style={styles.container}>
            <Image source={require('../assests/image/logo11.png')}
                resizeMode="contain"
                style={styles.logo}
            />


            <View style={{ marginTop: 10 }}>
                <Text style={styles.text1}>WHAT SEEMS HARD NOW WILL ONE DAY BE,</Text>
                <Text style={styles.text2}>YOUR WARM-UP</Text>
            </View>


            <TextInput variant="outlined" placeholder='Full Name' onChangeText={(Name) => setName(Name)} style={{ width: "90%", marginTop: 10, }} />
            <TextInput variant="outlined" placeholder='Email' onChangeText={(Email) => setEmail(Email)} style={{ width: "90%", marginTop: 10, }} />
            <TextInput variant="outlined" placeholder='Password' secureTextEntry={true}
                onChangeText={(Password) => setPassword(Password)} style={{ width: "90%", marginTop: 10, }} />



                <Button title="Create Account" onPress={() => OnCreateAccount(Email, Password)} style={{ width: "90%", marginBottom: 10, backgroundColor: '#004aad', marginTop: 10 }} />


            <Text style={styles.text3}>OR REGISTER WITH</Text>

            <View style={styles.social}>
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
                            navigation.navigate('Home');
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
                            navigation.navigate('Home');
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







            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, color: '#5d90d4', fontStyle:'italic',fontWeight: 'bold', }} >Already have an account?</Text>
                <Button variant="text" title="Sign In" color='#004aad' onPress={() => OnSigninPressed()} />
            </View>





        </View>
    )





}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //flex: 1,
        backgroundColor: 'white',
        height:'100%'
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10,
        marginTop: 10,

    },
    button: {
        width: 50,
        height: 50,
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 30,
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
        marginTop: 5,
        fontStyle:'italic'





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
    social: { flexDirection: 'row', alignItems: 'center', },




})
export default RegisterSrcee;

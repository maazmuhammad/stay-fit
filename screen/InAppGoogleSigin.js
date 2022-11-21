import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Keyboard, Pressable, ActivityIndicator, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';











const InAppGoogleSignin = () => {
   

    




    const navigation = useNavigation();
    // const OnLoginPressed = async (Email, Password) => {
    //     navigation.navigate('Home1')
    // }


  
    
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

           
    )





}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: 50,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 30,

        //backgroundColor:'orange'
    },
   

})
export default InAppGoogleSignin;

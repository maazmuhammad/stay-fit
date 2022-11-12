import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextInput, Button } from "@react-native-material/core";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
    drawer: {
        borderRadius: 10,
        backgroundColor: 'white'
    },
    button1: {
        width: 30,
        height: 30,
    },

})


//const navigation = useNavigation();

const OnLogoutPressed = async () => {

    try {
        // await GoogleSignin.hasPlayServices();
        // const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo });

        GoogleSignin.signOut();
        auth().signOut();
        console.log("Sign out successfull")

        // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
        console.log(error);
    }
    //navigation.navigate('Login');



}

const ConnectWallet = () => { }








export default function DrawerCon(props) {
    
    return (
        <View >
            <View style={{ flexDirection: 'row' }} >
               
                <View style={{ backgroundColor: '#F81250', height: 40, width: 150, marginTop: 20, borderRadius: 10, left: 110 }}>

                    <Image
                        style={{

                            width: 30,
                            height: 30,
                            marginTop: 5,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/donate.png')}
                    />
                </View>
            </View>
            <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>
                USER NAME
            </Text>

            <Pressable onPress={() => props.navigation.navigate('SetGoal')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10, }}>
                <Image
                    style={{ height: 30, width: 30 }}
                    source={require('../assests/image/run.png')}
                />

                <Text style={{ fontSize: 17, color: '#F81250', fontWeight: 'bold', marginHorizontal: 30 }}>
                    Set Goal
                </Text>
            </Pressable>
            <Pressable onPress={() => ConnectWallet()} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10, }}>
                <Image
                    style={{ height: 30, width: 30 }}
                    source={require('../assests/image/wallet.png')}
                />

                <Text style={{ fontSize: 17, color: '#F81250', fontWeight: 'bold', marginHorizontal: 30 }}>
                    Connect Wallet
                </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('DailyTask')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10, }}>
                <Image
                    style={{ height: 30, width: 30 }}
                    source={require('../assests/image/ballot.png')}
                />

                <Text style={{ fontSize: 17, color: '#F81250', fontWeight: 'bold', marginHorizontal: 30 }}>
                    Add Daily TasK
                </Text>
            </Pressable><Pressable onPress={() => props.navigation.navigate('WorkoutTask')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10, }}>
                <Image
                    style={{ height: 30, width: 30 }}
                    source={require('../assests/image/ballot.png')}
                />

                <Text style={{ fontSize: 17, color: '#F81250', fontWeight: 'bold', marginHorizontal: 30 }}>
                    Add Workout Task
                </Text>
            </Pressable>

            <Button style={{ marginBottom: 15, borderRadius: 20, width: '50%', marginHorizontal: 60, alignItems: 'center', marginTop: 300 ,color:'#F81250'}} title="Logout" color='#F81250' onPress={() => OnLogoutPressed()} />





        </View>


    );
}

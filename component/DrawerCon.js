//import React from 'react';
import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextInput, Button } from "@react-native-material/core";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { connect } from "react-redux";
//import auth from '@react-native-firebase/auth';



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






const OnLogoutPressed = async (props) => {
    // const navigation = useNavigation();

    try {
        // await GoogleSignin.hasPlayServices();
        // const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo });

        GoogleSignin.signOut();
        auth().signOut();
        console.log("Sign out successfull")
        props.navigation.navigate('Login')

        // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
        console.log(error);
    }
    // navigation.navigate('Login');



}

const ConnectWallet = () => {


 }









const DrawerCon = (props) => {
    const [goalstep, setgoalstep] = useState();
    const [coin, setcoin] = useState();

    useEffect(() => {
        console.log(auth().currentUser, 'usermaaz')
        console.log(props.steps, "steps")
        firestore()
            .collection('Setgoal')
            .doc(auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                setgoalstep(querySnapshot._data.StepGoal)
                // console.log(goalstep, "steps drawer")
            });

        if (!!props.steps && !!goalstep && (props.steps >= goalstep)) {
            firestore()
                .collection('Coin')
                .doc(auth().currentUser.uid)
                .update({

                    Coin: coin + 500,


                })
                .then(() => {
                    firestore()
                        .collection('Setgoal')
                        .doc(auth().currentUser.uid)
                        .update({

                            StepGoal: 0,


                        })
                        .then(()=>{
                                Alert.alert("Congratulations!! You achieve your Goals")                             
                        });


                });
        }

        firestore()
            .collection('Coin')
            .doc(auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
                // console.log(querySnapshot._data.Coin)
                setcoin(querySnapshot._data.Coin)
                console.log(coin, "coin")
            });
    }, [props.steps]);

    return (
        <View >


            <View style={{ flexDirection: 'row' }} >

                <View style={{ backgroundColor: '#5d90d4', height: 40, width: 150, marginTop: 20, borderRadius: 10, left: 110, flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        style={{

                            width: 30,
                            height: 30,
                            marginTop: 5,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/dollar.png')}
                    />

                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', paddingLeft: 10, marginBottom: 0, }}>
                        {coin}
                    </Text>


                </View>
            </View>
            <View  style={{ flexDirection: 'row', alignItems:'center' }}>
            <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/user.png')}
                />

            <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 20, marginBottom: 20, padding: 10, color: '#004aad' }}>
                Hey!!  {auth().currentUser.displayName}
            </Text>
            </View>
            <Pressable onPress={() => props.navigation.navigate('Home1')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,  alignItems:'center'}}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/home.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10,marginTop: 10, }}>
                    Home
                </Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('SetGoal')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,  alignItems:'center'}}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/target.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10,marginTop: 10, }}>
                    Set Goal.
                </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Meta')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,  alignItems:'center'}}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/meta.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10 }}>
                    Create MetaMask Wallet.
                </Text>
            </Pressable>

            <Pressable  onPress={() => props.navigation.navigate('Adds')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,  alignItems:'center'}}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/adv.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10 }}>
                    Watch & Earn
                </Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Wallet')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,  alignItems:'center'}}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/crypto.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10 }}>
                    Connect Wallet.
                </Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('DailyTask')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,alignItems:'center' }}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/ballot1.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10 }}>
                    Add Daily Task.
                </Text>
            </Pressable><Pressable onPress={() => props.navigation.navigate('WorkoutTask')} style={{ marginHorizontal: 20, flexDirection: 'row', marginTop: 10,alignItems:'center' }}>
                <Image
                    style={{ height: 50, width: 50 }}
                    source={require('../assests/image/ballot1.png')}
                />

                <Text style={{ fontSize: 20, color: '#5d90d4', fontWeight: 'bold', marginHorizontal: 10 }}>
                    Add Workout Task.
                </Text>
            </Pressable>

            
            
            

            <Button style={{ marginBottom: 15, borderRadius: 20, width: '50%', marginHorizontal: 60, alignItems: 'center', color: 'white',marginTop:80 }} title="Logout" color='#004aad' onPress={() => OnLogoutPressed(props.navigation.navigate('Login'))} />





        </View>


    );
}
const mapStateToProps = (store) => (
    {
        steps: store.user.steps,
    }
);

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerCon);

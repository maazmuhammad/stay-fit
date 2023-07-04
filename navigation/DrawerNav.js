import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetGoal from "../screen/SetGoal";
import AddDailyTask from "../screen/AddDailyTask";
import AddWorkOutTask from "../screen/AddWorkOutTask";
import DrawerCon from "../component/DrawerCon";
import Home1 from '../screen/Home1';
import auth from '@react-native-firebase/auth'
import LogInScreen from '../screen/LogInScreen';
import RegisterSrcee from '../screen/RegisterScree';
import StackNavigation from '../navigation/index'
import HomeNavigation from './HomeStack';
import ActivitySummaryNav from './ActivitySummaryNav';
import Adv from '../screen/Adv';
import Metamask from '../screen/metamask';
import Wallet from '../screen/wallet';
// import ViewMore from '../screen/ViewMore';
//import InAppGoogleSignin from '../screen/InAppGoogleSignin';
import firestore from '@react-native-firebase/firestore';
//import InAppSignin from '../screen/InAppSignin';







const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();


const DrawerNav = (props) => {

    const [user, setUser] = useState(null)

    const setUserData = (currentUser) => {
        try {
            firestore()
                .collection('users')
                .doc(currentUser.uid)
                .set({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    uid: currentUser.uid,

                })
                .then(() => {
                    console.log('User added!');
                });

        } catch (error) {
            console.log(error, 'firebase collection err')

        }
    }

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                //console.log(user, "user--------------")
                setUser(user)
                setUserData(user)
            }
        })
    }, []);
  //  console.log(user, 'userr----')


    const renderDrawer = () => {
        return (
            <NavigationContainer>
                <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerCon {...props} />}>
                    <Drawer.Screen name="Home1" component={HomeNavigation} />
                    
                    <Drawer.Screen name="Login" component={LogInScreen} />
                    <Drawer.Screen name="Smart" component={ActivitySummaryNav} />
                
                    <Drawer.Screen name="SetGoal" component={SetGoal} />
                    <Drawer.Screen name="DailyTask" component={AddDailyTask} />
                    <Drawer.Screen name="WorkoutTask" component={AddWorkOutTask} />
                    <Drawer.Screen name="Adds" component={Adv} />
                    <Drawer.Screen name="Meta" component={Metamask} />
                    <Drawer.Screen name="Wallet" component={Wallet} />

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
    return (

        !!user
            ?
            renderDrawer()
            :
            <NavigationContainer>
                <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                    <AuthStack.Screen name='Login' component={LogInScreen} />
                    <AuthStack.Screen name='Register' component={RegisterSrcee} />
                    <AuthStack.Screen name='Home1' component={Home1} />
                </AuthStack.Navigator>
            </NavigationContainer>
    );
}


export default DrawerNav;

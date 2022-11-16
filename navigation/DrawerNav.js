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
import ViewMore from '../screen/ViewMore';
import firestore from '@react-native-firebase/firestore';






const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();


const DrawerNav = () => {

    const [user, setUser] = useState(null)

    const setUserData = () => {
        try {
           // console.log("1123123=============--------------")
            firestore()
                .collection('users')
                .doc(user.uid)
                .then(() => {
                    console.log('User added!');
                })
        } catch (error) {
            console.log(error, 'firebase collection err')
        }
    }

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user, "user--------------")
                setUser(user)
                setUserData()
            }
        })
    }, []);


    return (
        <NavigationContainer>
            {
                user ?
                    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerCon {...props} />}>
                        <Drawer.Screen name="Home1" component={HomeNavigation} />
                        {/* <Drawer.Screen name="Home" component={HomeNavigation} /> */}


                        <Drawer.Screen name="Smart" component={ActivitySummaryNav} />
                        <Drawer.Screen name="More" component={ViewMore} />



                        <Drawer.Screen name="SetGoal" component={SetGoal} />
                        <Drawer.Screen name="DailyTask" component={AddDailyTask} />
                        <Drawer.Screen name="WorkoutTask" component={AddWorkOutTask} />



                    </Drawer.Navigator>

                    :
                    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                        <AuthStack.Screen name='Login' component={LogInScreen} />
                        <AuthStack.Screen name='Register' component={RegisterSrcee} />

                    </AuthStack.Navigator>

            }

        </NavigationContainer>
    );
}


export default DrawerNav;

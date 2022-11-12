import React, {useState, useEffect} from 'react';
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





const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();


const DrawerNav = () => {

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            console.log(user, "user--------------")
            if(user){
                setUser(user)
            }
        })
    }, []);

    return (
        <NavigationContainer>
            {
                user ?
                    <Drawer.Navigator screenOptions={{ headerShown: false}} initialRouteName='Home1' drawerContent={props => <DrawerCon {...props} />}>
                        <Drawer.Screen name="Home" component={HomeNavigation} />
                        <Drawer.Screen name="Smart" component={ActivitySummaryNav} />
                        <Drawer.Screen name="SetGoal" component={SetGoal} />
                        <Drawer.Screen name="DailyTask" component={AddDailyTask} />
                        <Drawer.Screen name="WorkoutTask" component={AddWorkOutTask} />
                       

                    </Drawer.Navigator>
                    
                    :
                    <AuthStack.Navigator screenOptions={{ headerShown: false}}>
                        <AuthStack.Screen name='Login' component={LogInScreen} />
                        <AuthStack.Screen name='Register' component={RegisterSrcee} />

                    </AuthStack.Navigator>
                    
            }

        </NavigationContainer>
    );
}


export default DrawerNav;

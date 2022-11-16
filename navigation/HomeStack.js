import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SetGoal from "../screen/SetGoal";
import AddDailyTask from "../screen/AddDailyTask";
import AddWorkOutTask from "../screen/AddWorkOutTask";
import  DrawerCon  from "../component/DrawerCon";
import LogInScreen from '../screen/LogInScreen';
import RegisterSrcee from '../screen/RegisterScree';
import Home from '../screen/Home';
import Home1 from '../screen/Home1';
import SmartNutrition from '../screen/SmartNutrition'
import ViewMore from '../screen/ViewMore';






const HomeStack=createNativeStackNavigator();



const HomeNavigation = () => {
    return (
        // <NavigationContainer>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name='Home1'component={Home1}/>
                <HomeStack.Screen name='More'component={ViewMore}/>
                <HomeStack.Screen name='Dawer' component={DrawerCon}/>
                <HomeStack.Screen name='Home' component={Home}/>
                <HomeStack.Screen name='Smart' component={SmartNutrition}/>
               


                
            </HomeStack.Navigator>  
            
    );
}


export default HomeNavigation;

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






const SummaryStack=createNativeStackNavigator();




const ActivitySummaryNav = () => {
    return (
        // <NavigationContainer>
            <SummaryStack.Navigator screenOptions={{ headerShown: false }}>
                <SummaryStack.Screen name='Home1'component={Home1}/>
                
            </SummaryStack.Navigator>  
            
    );
}


export default ActivitySummaryNav;

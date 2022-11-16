import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Keyboard, Pressable, Touchable, FlatList } from 'react-native';
import { TextInput, Button, } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import {
    ProgressChart,
    BarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

import 'react-native-gesture-handler';
import { Calendar, } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';









const ViewMore = () => {
    // const [user, setState] = useState('');
    const [UserData, setUserData] = useState({});
    const [calendar, setcalendar] = useState(false);
    const screenWidth = Dimensions.get("window").width

    

    LocaleConfig.locales['fr'] = {
        monthNames: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'fr';

    const data = {
        labels: ["Run"], // optional
        data: [0.4]
    };
    const data1 = {
        labels: ["12:00 am", "6:00 am", "12:00 pm", "6:00 pm"],
        datasets: [
            {
                data: [0.7, 0.1, 0.9, 0.3, 0.5]
            }
        ]
    };



    const navigation = useNavigation();

    const OnNavigateHome1 = async () => {
        navigation.navigate('Home1');


    }
    const OnLogoutPressed = async () => {

        try {
            // await GoogleSignin.hasPlayServices();
            // const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });

            GoogleSignin.signOut();
            auth().signOut();
            console.log("Sign out successfull")

            this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('Login');



    }
    const onCalendar = async () => {

        setcalendar(!calendar)




    }
    const onDrawer = async () => {



    }

    // const chartConfig = {
    //     backgroundGradientFrom: "black",
    //     backgroundGradientFromOpacity: 1,
    //     backgroundGradientTo: "black",
    //     backgroundGradientToOpacity: 0.5,
    //     color: (opacity = 2) => `rgba(248, 18, 80,${opacity})`,
    //     strokeWidth: 1, // optional, default 3
    //     barPercentage: 0.2,
    //     useShadowColorFromDataset: false // optional
    // }
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(248, 18, 80,${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const graphStyle = {
        //marginVertical: 80,
        ...chartConfig.style
    };

    return (

        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#F81250', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Pressable style={{ right: 20 }}
                                onPress={() => navigation.openDrawer()}
                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/menu.png')}
                                />

                            </Pressable>


                            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 10, color: 'white', left: 5, }}>View More</Text>
                            <Pressable style={{ marginHorizontal: 20 }}
                                onPress={() => onCalendar()}
                            >
                                <Image
                                    style={styles.button1}
                                    source={require('../assests/image/calendar.png')}
                                />

                            </Pressable>
                        </View>
                    </View>
                </View>

            </View>
            <View>
                {
                    !!calendar
                    &&
                    <Calendar
                    


                        // Initially visible month. Default = now
                        initialDate={'2022-11-14'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2022-11-14'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2022-11-14'}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={day => {
                            console.log('selected day', day);
                        }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={day => {
                            console.log('selected day', day);
                        }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={month => {
                            console.log('month changed', month);
                        }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        // renderArrow={direction => <Arrow />}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={false}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                        firstDay={1}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        disableArrowLeft={false}
                        // Disable right arrow. Default = false
                        disableArrowRight={false}
                        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                        disableAllTouchEventsForDisabledDays={false}
                        // Replace default month and year title with custom one. the function receive a date as parameter
                        renderHeader={date => {
                            // Return JSX
                        }}
                        // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={false}
                    />}
            </View>

            <View style={{ marginTop: 10 }}>


                <View style={{ height: 300, }}>


                    <ProgressChart
                        data={data}
                        width={screenWidth}
                        height={300}
                        strokeWidth={50}
                        radius={100}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />

                </View>
                <View style={{ top: -25 }} >


                    <BarChart
                        style={graphStyle}
                        data={data1}
                        width={screenWidth}
                        height={160}
                        chartConfig={chartConfig}

                    />

                </View>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30 }}>
                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>MOVE:</Text>
                </View>

                <View style={{ backgroundColor: 'red', height: 60, width: 150, borderRadius: 8, }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            marginTop: 10,
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/heart.png')}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginHorizontal: 30 }}>
                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, marginTop: 10, borderRadius: 8, marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Steps:</Text>
                </View>

                <View style={{ backgroundColor: '#F81250', height: 60, width: 150, marginTop: 10, borderRadius: 8, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Distance:</Text>

                </View>
            </View>


        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',



    },
    button: {
        width: 30,
        height: 30,
        //marginTop: 10,
        //marginBottom: 10,
        marginHorizontal: 30,
        left: 300,
        // backgroundColor: 'orange'

    },
    button1: {
        width: 30,
        height: 30,
        marginTop: 10,

        marginHorizontal: 30,



        //  backgroundColor: 'orange'
    },
})

export default ViewMore;


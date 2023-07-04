
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Pressable, Image, Button,Alert } from 'react-native';
import {
    ProgressChart,

} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Flex } from '@react-native-material/core';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




const SetGoal = () => {
    const [Goal, SetGoal] = React.useState('');
    const screenWidth = Dimensions.get("window").width
    const [user, setUser] = useState(null)
    const [goalstep, setgoalstep]=useState();

    firestore()
    .collection('Setgoal')
    .doc(auth().currentUser.uid)
    .get()
    .then(querySnapshot => {
      //console.log(querySnapshot)
      //console.log(querySnapshot._data.StepGoal)
      setgoalstep(querySnapshot._data.StepGoal)
      console.log(goalstep,"ahhahahah")
      //console.log(showdata)
     

    });
   
    const data = {
        // labels: ["Run"], // optional
        
        data: [(goalstep||0)/10000]
    };
    // const SaveGoal = () => {

    // }
   // SaveGoal(user)


   


    const SaveGoal = () => {

        if(Goal>=5000){
            Alert.alert("Goal Set")

            try {
                firestore()
                    .collection('Setgoal')
                    .doc(auth().currentUser.uid)
                    .set({

                        StepGoal: Goal,
    
                    })
                    .then(() => {
                        console.log('Goal added!');
                    });
    
            } catch (error) {
                console.log(error, 'firebase collection err')
    
            }
        }else(
            Alert.alert("Goal Steps should be greater then 5000")
        )
        
    }

    // useEffect(() => {
    //     auth().onAuthStateChanged((user) => {
    //         if (user) {
    //              console.log(user, "user--------------")
    //            setUser(user)
    //            SaveGoal(user)
            
    //         }
    //     })
    // }, []);
   
   
    const navigation = useNavigation();
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#AAEAFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 75, 173,${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional

    };




    return (
        <View style={{ backgroundColor: '#AAEAFF', flex: 1 }}>




<View style={{ backgroundColor: '#AAEAFF' }}>


<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{ backgroundColor: '#004aad', width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, padding: '3%' }}>
        <View style={{ flexDirection: 'row' }}>

            <Pressable style={{}}
                onPress={() => navigation.openDrawer()}
            >
                <Image
                    style={styles.button1}
                    source={require('../assests/image/menu.png')}
                />

            </Pressable>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', width: "90%", textAlign: 'center' }}>Set Goal</Text>
        </View>
    </View>
</View>

</View>


            <View style={{}}>

                <ProgressChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    strokeWidth={50}
                    radius={90}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                        style={{
                            width: 80,
                            height: 80,
                          
                            marginHorizontal: 10,
                        }}
                        source={require('../assests/image/footprint.png')}
                    />
                    <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#004aad', marginTop: 10, marginHorizontal: 15, textAlign: 'center' }}>Set Steps:</Text>
                </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 10, marginHorizontal: 10, textAlign: 'center' }}>Set your numbers of steps for today</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>

                    <TextInput
                        onChangeText={(Goal) => SetGoal(Goal)}
                        keyboardType='numeric'
                        maxLength={5}
                        placeholder="min steps 5K"

                        style={{
                            borderWidth: 6,
                            borderColor: '#004aad',
                            width: '70%',
                            marginRight: 8,
                            padding: 8,
                            borderRadius: 10,
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: '#004aad',
                            
                        }}
                    >


                    </TextInput>

                    <TouchableOpacity
                        onPress={() => SaveGoal()}
                        style={styles.roundButton2}

                    >
                        <Text style={{ fontWeight: 'bold', color: '#004aad', fontSize: 20, alignSelf: 'center' }}>Set</Text>
                    </TouchableOpacity>
                </View>



            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    roundButton2: {


        width: 80,
        height: 80,
        padding: 15,
        borderRadius: 100,
        borderWidth: 6,
        borderColor: '#004aad',
        marginHorizontal: 20

    },
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        //backgroundColor: 'orange'
    },
    inputContainer: {
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 6,
        borderBottomColor: '#F81250'


    },
    TextInput: {
        borderWidth: 5,
        borderColor: '#F81250',
        width: '70%',
        marginRight: 8,
        padding: 8,
        borderRadius: 10,




    },
})

export default SetGoal;

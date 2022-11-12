import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Pressable, Image ,Button} from 'react-native';
import {
    ProgressChart,

} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Flex } from '@react-native-material/core';

const SetGoal = () => {
    const [Goal, SetGoal] = React.useState('');
    const screenWidth = Dimensions.get("window").width
    const data = {
        labels: ["Run"], // optional
        data: [0.7]
    };
    const SaveGoal = () => {

    }
    const navigation = useNavigation();
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





    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>




            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F81250', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20,  }}>
               <View style={{flexDirection:'row'}}>

                <Pressable style={{ right:20 }}
                    onPress={() => navigation.openDrawer()}
                    >
                    <Image
                        style={styles.button1}
                        source={require('../assests/image/menu.png')}
                        />

                </Pressable>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Set Goal</Text>
                        </View>
                </View>
            </View>


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
            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>

                <View>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white', marginTop: 10, marginHorizontal: 10, marginBottom: 20 }}>Set Steps:</Text>
                </View>
                 <View style={{flexDirection:'row' , alignItems:'center'}}>

                <TextInput
                    onChangeText={(Goal) => SetGoal(Goal)}
                    keyboardType='numeric'
                    maxLength={4}
                    
                    style={{ borderWidth: 6,
                        borderColor: '#F81250',
                        width: '70%',
                        marginRight: 8,
                        padding: 8,
                        borderRadius: 10, 
                        fontSize:32,
                        fontWeight:'bold',
                        color:"white"
                     }}
                    >


                </TextInput>

                <TouchableOpacity
                    onPress={() => SaveGoal()}
                    style={styles.roundButton2}
                    
                    >
                    <Text style={{  fontWeight: 'bold', color: '#F81250', fontSize:25 ,alignSelf:'center' }}>Set</Text>
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
        padding: 10,
        borderRadius: 100,
        borderWidth:6,
        borderColor:'#F81250',
        marginHorizontal:20
        
    },
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        marginTop: 10,
        marginHorizontal: 30,
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

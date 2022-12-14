import React from 'react';
import { View, StyleSheet, Text, Pressable, Image, ToastAndroid,TouchableHighlight, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
const SmartNutrition = () => {
    const [Pic, SetPic] = React.useState('');
    const navigation = useNavigation();

    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }

    const uploadImage = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        }
        launchImageLibrary (options,response=>{
            if(response.didCancel){
                setToastMsg('Cancelled image selection')
            }else if(response.errorCode =='permission'){
                setToastMsg('permission not satisfied')
            }else if (response.errorCode =='others'){
                setToastMsg(response.errorMessage);
            }
            else if(response.assets[0].fileSize >2097152){
                Alert.alert(
                    'Maximum image  size exceeded',
                    'please choose image under 2 MB',
                    [{text: 'OK'}],
                )
            }else{
                SetPic(response.assets[0].base64);
            }

        })
    }

    const removeImage=()=>{
        SetPic('')
        setToastMsg('Image removed')
    }


    return (
        <View style={{backgroundColor:'black',flex:1}}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ backgroundColor: '#F81250', height: 50, width:'90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20,alignItems: 'center' }}>
                    <Text style={{ fontSize: 34 , fontWeight: 'bold', paddingLeft: 10, color:'white' }}>Smart Nutrition</Text>
                </View>
            </View> */}

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
                        <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Smart Nutrition</Text>

                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableHighlight
                    onPress={() => uploadImage()}
                    underlayColor='rgba(248,18,80.1)'>
                    <Avatar.Image
                        size={300}
                        source={{ uri: 'data:image/png;base64,' + Pic }}
                        backgroundColor='#d2d2d2'
                        
                    />
                </TouchableHighlight>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', }} >
                <Button mode='contained' onPress={() => uploadImage()} style={{ marginRight: 5 , backgroundColor:'#F81250' }}>
                    Upload Image
                </Button>

                <Button mode='contained' onPress={() => removeImage()} style={{backgroundColor:'#F81250' }}>
                    Remove Image
                </Button>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    button1: {
        maxWidth: 30,
        width: 30,
        height: 30,
        marginTop: 10,
        marginHorizontal: 30,
        //backgroundColor: 'orange'
    },
})

export default SmartNutrition;

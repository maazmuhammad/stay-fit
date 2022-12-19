import React, { useRef, useEffect, } from 'react';
import { View, StyleSheet, Text, Pressable, Image, ToastAndroid, TouchableHighlight, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
// import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
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
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                setToastMsg('Cancelled image selection')
            } else if (response.errorCode == 'permission') {
                setToastMsg('permission not satisfied')
            } else if (response.errorCode == 'others') {
                setToastMsg(response.errorMessage);
            }
            else if (response.assets[0].fileSize > 2097152) {
                Alert.alert(
                    'Maximum image  size exceeded',
                    'please choose image under 2 MB',
                    [{ text: 'OK' }],
                )
            } else {
                SetPic(response.assets[0].base64);
                // const reference = storage().ref('maazimages');
                // console.log(SetPic,"pic")
            }

        })
    }

    const removeImage = () => {
        SetPic('')
        setToastMsg('Image removed')
    }

    const UploadtoStorage = async () => {
        // console.log(Pic,"pic url")

        const reference = await storage().ref('uploadImage' + new Date().getTime());
        await reference.putString('data:image/png;base64,' + Pic, 'data_url');
        const Url = await reference.getDownloadURL();

        console.log(Url)
        try{

            const { data } = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAAtLItq7Yx76RbBgpzalzv95Z3dCb82wU',
                {
                    "requests": [
                        {
                            "image": {
                                "source": {
                                    "imageUri": Url
                                }
                            },
                            "features": [
                                {
                                    "type": "LABEL_DETECTION"
                                }
                            ]
                        }
                    ]
    
                }
    
    
    
    
            )
        }catch(error){
            console.log(error)
        }
        






    }

    // useEffect(() => {

    //     console.log(URL,"URL")
    //     console.log(SetPic,'uri')
    // }, []);


    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
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
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>Smart Nutrition</Text>

                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableHighlight
                    onPress={() => uploadImage()}
                    underlayColor='rgba(248,18,80.1)'>
                    {/* <Avatar.Image



                        size={300}
                        source={{ uri: 'data:image/png;base64,' + Pic }}
                        backgroundColor='#d2d2d2'
                       
                        
                    /> */}
                    <View style={styles.Avatar}>
                        {
                            !!Pic
                                ?
                                <Image
                                    source={{ uri: 'data:image/png;base64,' + Pic }}
                                    style={styles.AvatarImage}
                                />
                                :
                                <Text style={[styles.AvatarImage, { color: 'grey', textAlign: 'center', marginVertical: 140, fontSize: 30, fontWeight: 'bold' }]}>Upload Image</Text>
                        }

                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ marginTop: 20, alignSelf: 'center', width: 300 }} >
                {/* <Button mode='contained' onPress={() => uploadImage()} style={{ marginRight: 5 , backgroundColor:'#F81250' }}>
                    Upload Image
                </Button>

                <Button mode='contained' onPress={() => removeImage()} style={{backgroundColor:'#F81250' }}>
                    Remove Image
                </Button> */}
                <Button mode='contained' onPress={() => UploadtoStorage()} style={{ backgroundColor: '#F81250' }}>
                    Analyze
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
    Avatar: {
        backgroundColor: 'white',
        height: 300,
        width: 300,
        borderRadius: 300,
    },

    AvatarImage: {
        height: 300,
        width: 300,
        borderRadius: 300,
    }

})

export default SmartNutrition;

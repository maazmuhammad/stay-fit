import { useState ,useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



export default function AddDailyTask() {
  const [enteredGoalText, setenteredGoalText] = useState('');
  const [goal, setgoal] = useState([]);
  const[showdata, setshowdata]=useState([]);

  const DailyTask = () => {
    console.log(showdata,"showdata")
    try {
      firestore()
        .collection('Setgoal')
        .doc(auth().currentUser.uid)
        .set({

          DailyTask: showdata,

        })
        .then(() => {
          console.log('todo task added!');
        });

    } catch (error) {
      console.log(error, 'firebase collection err')

    }

  }

  const Getdata=()=>{
    try{
      firestore()
        .collection('Daily')
        .doc(auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          //console.log(querySnapshot)
        // console.log(querySnapshot._data.DailyTask)
          setshowdata(querySnapshot._data.DailyTask)
          console.log(showdata)
         

        });

    }catch(error){
      console.log(error, ' get')

    }
  }
  useEffect(() => {
    Getdata()
    
}, []);



  function goalInputHandler(enteredText) {
    setenteredGoalText(enteredText);

  };
  function addGoalHandler() {
    console.log(showdata,'dat1')
    setshowdata([
      ...showdata,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    DailyTask()
  };
  const navigation = useNavigation();

  return (
    <View style={styles.appContainer}>
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
            <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Daily Task</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.TextInput} placeholder='Daily Task!' onChangeText={goalInputHandler} />

        <Button color='#F81250' title='   Add   ' onPress={addGoalHandler} />

      </View>
      <View style={styles.list}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 16, }}>Your Daily Task List </Text>
        <FlatList
          data={showdata}
          renderItem={(itemd) => {
            console.log(itemd,"itemd")
            return (
              <View style={styles.item}>
                <Text style={styles.text}>{itemd.item.text}</Text>
              </View>
            );



          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black'
    // paddingTop: 50,
    //paddingHorizontal: 16,



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
    borderWidth: 1,
    borderColor: '#F81250',
    width: '70%',
    marginRight: 8,
    padding: 8,
    color: 'white'




  },
  list: {
    flex: 4

  },
  item: {


    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F81250',





  },
  text: {

    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  button1: {
    maxWidth: 30,
    width: 30,
    height: 30,
    marginTop: 10,
    marginHorizontal: 30,
    //backgroundColor: 'orange'
  },


});

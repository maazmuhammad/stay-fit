import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from '@react-native-material/core';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Image, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const COLOR = { primary: "#004aad", white: '#fff' }


const AddDailyTask = () => {
  const navigation = useNavigation();
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    savetodo(todos);
  }, [todos])
  React.useEffect(() => {
    gettodo()

  }, [])
  const ListItem = ({ todo }) => {
    return <View style={styles.ListItem}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: COLOR.white, textDecorationLine: todo?.commplete ? "line-through" : "none" }}>{todo?.task}</Text>
      </View>
      {
        !todo?.commplete && (
          <TouchableOpacity style={[styles.actionIcon]} onPress={() => markTodoComplete(todo?.id)}>
            <Image style={{ width: 30, height: 30 }} source={require('../assests/image/tick.png')}

            />
            {/* <Icon name='done' size={20} color={COLOR.white} /> */}
          </TouchableOpacity>
        )
      }

      <TouchableOpacity style={styles.actionIcon} onPress={() => deleteTodo(todo?.id)} >
        <Image style={{ width: 30, height: 30, }} source={require('../assests/image/del.png')}

        />

        {/* <Icon name='delete' size={20} color={COLOR.white} /> */}

      </TouchableOpacity>
    </View>
  }
  const savetodo = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);

    } catch (e) {
      console.log(e)

    }



  }
  const gettodo = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos))

      }
    }
    catch (error) {
      console.log(error)

    }
  }
  const addTodo = () => {

    // console.log(textInput)
    if (textInput == '') {
      Alert.alert("Error", "Enter  task")

    } else {

      const newTodo = {
        id: Math.random(),
        task: textInput,
        commplete: false,
      }
      setTodos([...todos, newTodo])
      setTextInput('')
    }


  }
  const markTodoComplete = todoId => {
    console.log(todoId)
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, commplete: true }

      }
      return item;

    })
    setTodos(newTodos);

  }
  const deleteTodo = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId)
    setTodos(newTodos)
  }
  const clearTodo = () => {
    Alert.alert("Confirm", "clear todo?", [{
      text: 'Yes',
      onPress: () => setTodos([]),
    },
    { text: ' No' }
    ])

  }
  return (

    <View style={styles.appContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ backgroundColor: '#004aad', height: 50, width: '90%', marginTop: 10, borderRadius: 10, marginHorizontal: 20, }}>
          <View style={{ flexDirection: 'row' }}>

            <Pressable style={{ right: 20 }}
              onPress={() => navigation.openDrawer()}
            >
              <Image
                style={[styles.button1, { marginTop: 10 }]}
                source={require('../assests/image/menu.png')}
              />

            </Pressable>
            <Text style={{ fontSize: 28, fontWeight: 'bold', paddingLeft: 10, color: 'white' }}>Daily Task</Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLOR.primary }}>Add Daily Task</Text>

        <Pressable style={{ left: 20 }}
          onPress={clearTodo}
        >
          <Image
            style={styles.button1}
            source={require('../assests/image/del.png')}
          />

        </Pressable>


      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos} renderItem={({ item }) => <ListItem todo={item} />} />
      <View style={styles.footer}>
        <View style={styles.input}>
          <TextInput placeholder='Add Daily Task'
            value={textInput}
            onChangeText={text => setTextInput(text)}
            placeholderTextColor={"white"}
            style={{ fontWeight: "bold", fontSize: 20, color: COLOR.white, }} />

        </View>

        <TouchableOpacity onPress={addTodo}>
          <View style={styles.IconContainer}>
            <Image
              style={styles.button1}
              source={require('../assests/image/add.png')}
            />
          </View>

        </TouchableOpacity>
      </View>




    </View>



  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  actionIcon: {
    height: 25,
    width: 25,
    //  backgroundColor: 'green',
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,

  },
  ListItem: {
    padding: 20,
    backgroundColor: COLOR.primary,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: COLOR.primary,
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,

  },
  input: {
    backgroundColor: COLOR.primary,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,

  },
  IconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLOR.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center"


  },
  appContainer: {
    flex: 1,
    backgroundColor: '#AAEAFF',
    //paddingTop: 10,
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
    borderBottomColor: '#004aad'


  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#004aad',
    width: '70%',
    marginRight: 8,
    padding: 8,
    color: '#004aad'




  },
  list: {
    flex: 4

  },
  item: {


    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#004aad',





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

    marginHorizontal: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    //backgroundColor: 'orange'
  },


});


export default AddDailyTask;

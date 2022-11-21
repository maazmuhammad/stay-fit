import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navigation from "./navigation";
import DrawerNav from "./navigation/DrawerNav";
import { Provider } from 'react-redux';
import store from "./Redux/Store"


const App = () => {
      return (
        <Provider store={store} >
            <DrawerNav />
            </Provider>
      )
}

const styles = StyleSheet.create({})

export default App;

import React, { useState } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GiaoDien1 from './GiaoDien/GiaoDien1';
import GiaoDien2 from './GiaoDien/GiaoDien2';
import GiaoDien3 from './GiaoDien/Giaodien3';
import MyContext from './GiaoDien/MyContext';

const Stack = createStackNavigator();

export default function App() {
  const [name, setName] = useState('Go Yoon Jung'); // State của context

  return (
    <Provider store={store}>
      <MyContext.Provider value={{ name, setName }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="GiaoDien1">
            <Stack.Screen name="GiaoDien1" component={GiaoDien1} options={{ headerShown: false }} />
            <Stack.Screen name="GiaoDien2" component={GiaoDien2} options={{ headerShown: false }} />
            <Stack.Screen name="GiaoDien3" component={GiaoDien3} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </Provider>
  );
}

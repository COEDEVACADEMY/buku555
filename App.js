
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import NotPaidScreen from './src/screens/NotPaidScreen';
import PaidScreen from './src/screens/PaidScreen';
import NewDebtScreen from './src/screens/NewDebtScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New Debt" component={NewDebtScreen} />
        <Tab.Screen name="Not Paid" component={NotPaidScreen} />
        <Tab.Screen name="Paid" component={PaidScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

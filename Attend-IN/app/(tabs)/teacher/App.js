import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimeDetailScreen from './timeDetailScreen';
import ReportScreen from './reportScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TimeDetail">
        <Stack.Screen name="TimeDetail" component={TimeDetailScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




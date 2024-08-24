import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from './src/routers/StackRoutes';
<sr></sr>;

const App = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};

export default App;

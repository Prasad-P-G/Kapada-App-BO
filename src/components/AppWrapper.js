import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';

const AppWrapper = ({children}) => {
  return <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>;
};

export default AppWrapper;

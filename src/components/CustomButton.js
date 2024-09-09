import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {myColors} from '../utils/Themes/Colors';

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: myColors.bodyColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

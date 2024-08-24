import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  //removing existring key - for testing
  const removeKey = async () => {
    //const key = ['kapadaKey'];
    try {
      console.log('About to Remove Key..');
      if (await AsyncStorage.getItem('kapadaKey')) {
        await AsyncStorage.Remove('kapadaKey');
      }
    } catch (e) {
      // remove error
    }
    console.log('key Removed..');
  };

  useEffect(() => {
    removeKey();
    setTimeout(() => {
      AsyncStorage.getItem('kapadaKey')
        .then(result => {
          if (result) {
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 2000);
  }, []);

  return (
    <AppWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: myColors.bodyColor,
        }}>
        <StatusBar hidden></StatusBar>
        <Image
          source={require('../../assets/images/logo1.png')}
          style={{width: responsiveWidth(100), height: 250, borderRadius: 50}}
        />
      </View>
    </AppWrapper>
  );
};

export default Splash;

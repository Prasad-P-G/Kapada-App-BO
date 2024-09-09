import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect, useSyncExternalStore} from 'react';
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
      const uerInfo = await AsyncStorage.getItem('kapadaKey');

      if (uerInfo) {
        console.log(JSON.parse(uerInfo));
        await AsyncStorage.removeItem('kapadaKey');
        console.log('key Removed..');
        navigation.replace('Login');
      } else {
        console.log('User not logged IN');
        navigation.replace('Login');
      }
    } catch (e) {
      // remove error
    }
  };

  useEffect(() => {
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
    //removeKey();
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

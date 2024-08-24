import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [OTP, setOTP] = useState(null);
  const [confirmData, setConfirmData] = useState(null);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // Verify Mobile Number
  const VerifyMobileNumber = async () => {
    try {
      // Firebase.initialize((context = this));
      // Firebase.appCheck.installAppCheckProviderFactory(
      //   DebugAppCheckProviderFactory.getInstance(),
      // );

      const mobile = '+91' + mobileNumber;
      console.log('Mobile Number is - ', mobile);
      const response = await auth().signInWithPhoneNumber(mobile);
      console.log(response.verificationId);
      console.log(response);
      setConfirmData(response);
      setConfirmStatus(true);
      console.log('OTP sent to verified mobile number');
    } catch (error) {
      console.log(error);
    }
  };

  // Verify OTP
  const VerifyOTP = async () => {
    try {
      console.log(OTP);
      const response = await confirmData.confirm(OTP);

      console.log(response);
      console.log('Mobile Number Verified');
    } catch (error) {
      console.log(error);
    }
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //setState({userInfo, error: undefined});
      if (userInfo) {
        console.log('info-->', userInfo);

        AsyncStorage.setItem('kapadaKey', JSON.stringify(userInfo));
        //navigation.replace('Home');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            console.log('SIGN_IN_CANCELLED');
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log('IN_PROGRESS');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            console.log('PLAY_SERVICES_NOT_AVAILABLE');
            break;
          default:
            // some other error happened
            console.log(error, 'Please try again later!');
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <AppWrapper>
      <StatusBar backgroundColor={myColors.bodyColor}></StatusBar>

      <View
        style={{
          flex: 1,
          backgroundColor: myColors.bodyColor,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: myColors.bodyColor,
            paddingHorizontal: 20,
          }}>
          <Image
            source={require('../../assets/images/logo1.png')}
            style={{
              width: responsiveWidth(100),
              height: 250,
              borderRadius: 50,
              alignSelf: 'center',
              marginTop: 50,
            }}
          />
          <Text
            style={{
              color: myColors.white,
              fontSize: responsiveFontSize(2),
              alignSelf: 'center',
              letterSpacing: 1.5,
            }}>
            Quick Delivery at your Door step!
          </Text>
        </View>

        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          {/* Mobile Inuput */}
          {!confirmStatus ? (
            <TextInput
              placeholder="Enter Your Mobile Number"
              style={{
                fontSize: responsiveFontSize(1.8),
                color: myColors.black,
                fontWeight: '400',
                textAlign: 'center',
                marginTop: 10,
                borderWidth: 2,
                marginVertical: 5,
                width: responsiveWidth(90),
                backgroundColor: myColors.white,
              }}
              onChangeText={value => setMobileNumber(value)}></TextInput>
          ) : (
            <TextInput
              placeholder="Enter OTP"
              onChangeText={value => setOTP(value)}
              style={{
                fontSize: responsiveFontSize(1.8),
                color: myColors.black,
                fontWeight: '400',
                textAlign: 'center',
                marginTop: 10,
                borderWidth: 2,
                marginVertical: 5,
                width: responsiveWidth(90),
                backgroundColor: myColors.white,
              }}></TextInput>
          )}

          {!confirmStatus ? (
            <TouchableOpacity
              onPress={VerifyMobileNumber}
              activeOpacity={0.8}
              style={{
                backgroundColor: myColors.white,
                padding: 15,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                width: responsiveWidth(50),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: myColors.black,
                  fontWeight: '700',
                }}>
                Verify Mobile
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={VerifyOTP}
              activeOpacity={0.8}
              style={{
                backgroundColor: myColors.white,
                padding: 15,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                width: responsiveWidth(50),
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: myColors.black,
                  fontWeight: '700',
                }}>
                Veryfy OTP
              </Text>
            </TouchableOpacity>
          )}

          {/* OR */}
          <View style={{marginTop: 25}}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: myColors.black,
                fontWeight: '900',
              }}>
              OR
            </Text>
          </View>
        </View>

        <View style={{flex: 0.25, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={_signIn}
            activeOpacity={0.8}
            style={{
              backgroundColor: myColors.white,
              padding: 15,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
              cursor: 'pointer',
            }}>
            <AntDesign
              name="google"
              size={20}
              color={myColors.bodyColor}></AntDesign>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: myColors.black,
                fontWeight: '700',
              }}>
              SignIn with Google
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(1.8),
              color: myColors.white,
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 10,
            }}>
            * I accept the terms & privacy policy
          </Text>
        </View>
      </View>
    </AppWrapper>
  );
};

export default Login;

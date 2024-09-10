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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderRightColor: 'green',
        width: '90%',
        height: 70,
        borderLeftWidth: 7,
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'green',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'yellow',
        borderRightColor: 'yellow',
        width: '90%',
        height: 70,
        borderLeftWidth: 7,
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text2NumberOfLines={3}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'orange',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        borderRightColor: 'red',
        width: '90%',
        height: 70,
        borderLeftWidth: 7,
        borderRightWidth: 7,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text2NumberOfLines={3}
      text1Style={{
        fontSize: 18,
        fontWeight: 700,
        color: 'red',
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

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
<<<<<<< HEAD
      Toast.show({
        type: 'info',
        text1: 'Mobile Number Verification',
        text2:
          'Processing Mobile Number, make sure you have entered valid one.',
        visibilityTime: 8000,
      });

=======
>>>>>>> 92b995963f31d6fee35abb3d7a110995f4aca0dd
      const mobile = '+91' + mobileNumber;
      console.log('Mobile Number is - ', mobile);
      const response = await auth().signInWithPhoneNumber(mobile);
      console.log(response.verificationId);
      console.log(response);
      setConfirmData(response);
      setConfirmStatus(true);

      console.log('OTP sent to verified mobile number');

      Toast.show({
        type: 'success',
        text1: 'Mobile Number verified',
        text2: 'OTP sent to your mobile number',
      });
    } catch (error) {
      console.log({error});
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2:
          'Could not verify mobile number, Please check the number you have entered',
      });
    }
  };

  // Verify OTP
  const VerifyOTP = async () => {
    try {
      console.log(OTP);
      const response = await confirmData.confirm(OTP);

      console.log(response);
      console.log('OTP Varified');
      Toast.show({
        type: 'success',
        text1: 'OTP verified Success!',
        text2: 'Enjoy your purchasing online',
      });

      setConfirmStatus(false);

      await AsyncStorage.setItem('kapadaKey', JSON.stringify(response));

      setTimeout(() => {
        navigation.replace('Home');
      }, 4000);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Entered OTP is Invalid --Info--' + error,
        text2: 'Try with valid OTP from valid Phone number',
      });
    }
  };

  const _signIn = async () => {
    try {
      Toast.show({
        type: 'info',
        text1: 'Google Signing In',
        text2: 'Preparing to signing in, please wait for few seconds..',
        visibilityTime: 8000,
      });

      console.log('CHECKING --- Play service is Isative!');
      await GoogleSignin.hasPlayServices();
      console.log('Play service is ative, Now trying signing with google');

      const userInfo = await GoogleSignin.signIn();
      //setState({userInfo, error: undefined});
      console.log('google singed IN - success!');
      if (userInfo) {
        console.log('info-->', userInfo);

        AsyncStorage.setItem('kapadaKey', JSON.stringify(userInfo));
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('Login error-->', error);
      console.log('google singed IN - Error!');
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
          case statusCodes.NETWORK_ERROR:
            // play services not available or outdated
            console.log('NETWORK_NOT Available');
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

        {/* Mobile Inuput */}
        <View
          style={{
            flex: 0.1,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!confirmStatus ? (
            <TextInput
              placeholder="Enter Mobile Number"
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

        {/* Google Signing IN */}
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
      <Toast config={toastConfig} autoHide={true} visibilityTime={5000} />
    </AppWrapper>
  );
};

export default Login;

import {
  View,
  Text,
  PermissionsAndroid,
  Modal,
  TextInput,
  FlatList,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import Geolocation from 'react-native-geolocation-service';
import {apiKey} from '../../utils/Keys/Keys';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {myColors} from '../../utils/Themes/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import UploadBanners from '../UploadBanners/UploadBanners';
import storage from '@react-native-firebase/storage';

//import url from '../../assets/images';

const DEFAULT_IMAGE = Image.resolveAssetSource('../../assets/images');

const Home = ({navigation}) => {
  const [userLocation, setUserLocation] = useState([]);
  console.log(apiKey);
  const [address, setAddress] = useState({});
  const [fullAddress, setFullAddress] = useState('');
  const [isLocationModel, setLocationModal] = useState(false);
  const [Allbanners, setBanners] = useState([]);

  useEffect(async () => {
    await requestGPSLocationPermission();
    console.log('location address request completed!');
    allBannersData();
  }, []);

  const allBannersData = async () => {
    console.log('Test - loading banneers data!....');
    const imageUrls = [];
    const allBanners = await storage()
      .ref()
      .child('/banners/')
      .list()
      .then(result => {
        result.items.forEach(img => {
          storage()
            .ref()
            .child(img.fullPath)
            .getDownloadURL()
            .then(url => {
              console.log('Image Url --- >', url);
              imageUrls.push(url);
            });
        });
        setBanners(null);
        setBanners(imageUrls);
      });
    //return banners;
  };

  const getCurrentLocation = () => {
    console.log('app key is -->', apiKey);
    Geocoder.init(apiKey);

    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          setLocationModal(false);

          //temp
          // setUserLocation({
          //   latitude: 15.462134886498815,
          //   longitude: 75.0102570303368,
          // });

          console.log('Position is - : ', position);
          setUserLocation({
            latitude: position.coords?.latitude,
            longitude: position.coords?.longitude,
          });

          // https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apiKey}
          const {data} = await axios.get(
            'https://geocode.maps.co/reverse?lat=' +
              position.coords.latitude +
              '&lon=' +
              position.coords.longitude +
              '&key=' +
              apiKey,
          );
          // const {data} = await axios.get(
          //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},
          //   ${position.coords.longitude}&key=${apiKey}`,
          // );

          // const {data} = await axios.get(
          //   'https://geocode.maps.co/reverse?lat=' +
          //     position.coords?.latitude +
          //     '&lon=' +
          //     position.coords?.longitude +
          //     '&key=' +
          //     apiKey,
          // );

          console.log('The Data is - > ', data);
          // //const address = JSON.parse(data.address);
          // console.log('The addres is ->', data.address);
          setAddress(data);
          //console.log('The addres is ---->', data.address.display_name);
          //Commented code
          let addresslist = Object.values(data.address);

          // const fullAdd = addresslist.map(item => {
          //   fullAddress + item;
          // });
          console.log('The addres is ->', addresslist);
          //setFullAddress(addresslist.toString());
          setFullAddress(addresslist.toString());

          //console.log('The addres is ->', addresslist.toString());
          console.log('The Full addres is ->', addresslist.toString());
        }
      },
      error => {
        setLocationModal(true);
        // See error code charts below.
        console.log('Cannot find the location address!');
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestGPSLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Kapada App - BO',
          message:
            'Kapada App - needs access to your location! ' +
            'so that you can access Outfits at that location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can accesss location');
        setLocationModal(false);
        getCurrentLocation();
      } else {
        setLocationModal(true);
        console.log('location access permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <AppWrapper>
      <AppHeader
        isLocationModel={isLocationModel}
        fullAddress={fullAddress}></AppHeader>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AppBody navigation={navigation} Allbanners={Allbanners}></AppBody>
      </ScrollView>

      <AppFooter
        isLocationModel={isLocationModel}
        onPress={requestGPSLocationPermission}></AppFooter>
    </AppWrapper>
  );
};

// HEADER
const AppHeader = ({fullAddress, isLocationModel}) => {
  return (
    <View
      style={{
        flex: 0.15,
        backgroundColor: 'white',
        paddingVertical: 10,
        gap: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <Ionicons name="person-circle-outline" size={45}></Ionicons>
        <View style={{flex: 0.9, alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 18,
              textAlign: 'center',
              color: myColors.bodyColor,
            }}>
            * Delivery in Quick Time
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text
              numberOfLines={1}
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: myColors.black,
              }}>
              Home -{' '}
            </Text>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  color: myColors.grey,
                }}>
                {isLocationModel
                  ? 'No Location Enabled'
                  : fullAddress
                  ? `${fullAddress}`
                  : 'Yet To Fetch Location...'}
              </Text>
            </View>
          </View>
        </View>
        <MaterialCommunityIcons size={40} name="note-edit-outline" />
      </View>

      {/* searchBox */}
      <View
        style={{
          borderColor: myColors.grey,
          flexDirection: 'row',
          borderWidth: 1,
          marginHorizontal: 15,
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 10,
          gap: 10,
        }}>
        <Ionicons name="search" size={25}></Ionicons>
        <TextInput
          placeholder="Search"
          style={{padding: 10, flex: 1}}></TextInput>
      </View>
    </View>
  );
};

// BODY
const AppBody = ({navigation, Allbanners}) => {
  // const banners = ['banner1.jpeg'];
  const renderBanners = ({item, index}) => {
    console.log('Current Banner is -->', item);
    return (
      <Image
        source={{uri: item}}
        style={{
          height: 180,
          width: responsiveWidth(80),
          borderRadius: 20,
          backgroundColor: myColors.bodyColor,
          alignItems: 'stretch',
          marginHorizontal: 5,
        }}></Image>
      // <Text>
      //   {item} - {index}
      // </Text>
    );
  };

  const bannerLoad = () => {
    navigation.replace('UploadBanners');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{padding: 10}}>
        <Button title="Upload Banners" onPress={() => bannerLoad()} />
      </View>

      <FlatList
        data={Allbanners}
        pagingEnabled
        horizontal
        renderItem={renderBanners}
        ItemSeparatorComponent={() => (
          <View style={{width: 5}}></View>
        )}></FlatList>
    </View>
  );
};

// BODY
const AppFooter = ({onPress, isLocationModel}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLocationModel}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'white',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <MaterialIcons name="pin-drop" size={100} color={myColors.black} />
          </View>

          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
              color: myColors.black,
            }}>
            Location Permission is Off
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: myColors.black,
              opacity: 0.7,
              marginBottom: 10,
            }}>
            Please enable location permission for better delivery experience
          </Text>
          <CustomButton title="Continue" onPress={onPress}></CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default Home;

import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {myColors} from '../../utils/Themes/Colors';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const UploadBanners = ({navigation}) => {
  const [imageData, setImageData] = useState(null);
  const [fullImageRefPath, setFullImageRefPath] = useState(null);
  const [ImageDownloadUrl, setImageDownLoadUrl] = useState('');
  const responseRef = useRef(null);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    console.log('Banner Component Loaded..............');
    allBannersData();
    console.log('THe banners are :', banners);
  }, []);

  const allBannersData = async () => {
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
              console.log('Image from Firebase --- >', url);
              imageUrls.push(url);
              setBanners(null);
              setBanners(imageUrls);
            });
        });
        // setBanners(null);
        // setBanners(imageUrls);
        //console.log('Banner urls-->', imageUrls.length);
      });

    //return imageUrls;
    //setImageData(null);
  };

  const pickBanner = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log('Response -- >', response);
      setImageData(response);
      console.log('Image Data -- >', imageData);
    } catch (error) {}
  };

  const UploadBanner = async () => {
    try {
      //const response = storage().ref('/banners/' + imageData.name);
      //console.log('Image uri -- >', ImageUri);
      console.log('Image Data for updaloading -->', imageData);
      const response = await storage()
        .ref('/banners/' + imageData.name)
        .putFile(imageData.fileCopyUri);

      setFullImageRefPath(response.metadata.fullPath);

      console.log(fullImageRefPath);
      //console.log(response);

      //const url = await response.getDownloadURL();

      //Getting the full url to download
      //setImageDownLoadUrl(url);

      //console.log('Image full Url to Download  ', ImageDownloadUrl);

      setImageData(null);
      //navigation.replace('Home');
      allBannersData();

      //allBannersData();
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteBanner = async () => {
    try {
      const response = await storage().ref(fullImageRefPath)?.delete();
      console.log('Deleted Response', response);
      console.log(fullImageRefPath + ' Is Deleted.');
      setImageData(null);
      //allBannersData();
    } catch (error) {
      console.log(error);
    }
  };

  const goHome = () => {
    navigation.replace('Home');
  };

  const renderBanners = ({item, index}) => {
    console.log('Flatlist renderItem Called...');
    console.log(item);
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

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        gap: 5,
      }}>
      {/* flatlist to show all banners */}
      <View style={{flex: 0.25}}>
        <FlatList
          data={banners}
          pagingEnabled
          horizontal
          renderItem={renderBanners}
          ItemSeparatorComponent={() => (
            <View style={{width: 5}}></View>
          )}></FlatList>
      </View>

      {/* Banner selection area */}
      <View style={{flex: 0.3}}>
        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 5,
          }}>
          <View
            style={{
              justifyContent: 'space-around',
              gap: '10',
              marginVertical: '5',
              flexDirection: 'col',
            }}>
            <View
              style={{
                alignContent: 'space-between',
                justifyContent: 'space-between',
              }}>
              <Button
                disabled={!imageData}
                title="Upload Banner"
                onPress={UploadBanner}
                color={myColors.bodyColor}
              />
              <Button
                title="Delete Banner"
                disabled={!imageData}
                onPress={DeleteBanner}
                color={'red'}
                sty
              />
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {imageData ? (
              <Image
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
                source={{uri: imageData.uri}}
                height={responsiveHeight(20)}
                width={responsiveWidth(55)}
              />
            ) : (
              <Text
                style={{
                  fontSize: 20,
                }}>
                No Banner Image Selected!
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button title="select banner" onPress={pickBanner} />
        <Button
          title="Read All Banners"
          onPress={allBannersData}
          color={'green'}
        />
        <Button title="Home" onPress={goHome} />
      </View>
    </View>
  );
};

export default UploadBanners;

const styles = StyleSheet.create({});

import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Color } from '../../UI/GlobalStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';

const CreatePost = ({navigation}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [thumbnail, setThumbnail] = useState({});

  const onChooseImage = async selectionType => {
    const options = {
      cameraType: 'back',
      mediaType: selectionType,
      includeBase64: true,
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets) {
      if (selectionType === 'photo') {
        const photoData = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };
        setThumbnail(photoData);
        setErrorMessage('');
      }
    }
    if (result.errorMessage) console.log(result.errorMessage, 'error');
  };

  const handleNextStepClick = async () => {
    if (!thumbnail.length) {
      //setLoaderVisible(false);
      if (!Object.keys(thumbnail).length) {
        setErrorMessage('Please upload an image');
        console.log('Please upload an image');
        return;
      } else {
        ImagePicker.openCropper({
          includeBase64: true,
          path: thumbnail.uri,
          cropping: false,
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          showCropFrame: true,
          mediaType: 'photo',
        })
        .then(image => {
          navigation.navigate('FilterScreen', {imageData: image});
        })
        .catch(e => console.log(e));
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.imageView}>
        {Object.keys(thumbnail).length ? (
          <>
            <View style={styles.insideView}>
              <Image
                source={{uri: thumbnail?.uri}}
                style={styles.thumbImage}
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.editView}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onChooseImage('photo')}
                style={[
                  styles.addLessonBtnContainer,
                  {marginEnd: 7},
                ]}>
                <Image
                  source={require('../../assets/icon_edit.png')}
                  resizeMode="contain"
                  style={styles.editImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setThumbnail({})}
                style={styles.addLessonBtnContainer}>
                <Image
                  source={require('../../assets/delete.png')}
                  resizeMode="contain"
                  style={styles.editImage}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={{...styles.pickContainer}}>
              <TouchableOpacity
                onPress={() => onChooseImage('photo')}
                activeOpacity={0.7}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.galleryView}>
                  <Image
                    source={require('../../assets/Pick.png')}
                    style={styles.galleryImg}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.postTextView}>
                  <Text style={styles.introText}>Upload Photo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {errorMessage !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.btnContainer]}
          onPress={handleNextStepClick}>
          <Text style={[styles.btnText]}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'black',
    backgroundColor: 'pink',
    textAlign: 'center',
    width: '80%',
    padding: 5,
  },
  btnContainer: {
    backgroundColor: Color.purple,
    borderRadius: 20,
    height: hp('5%'),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  button_next: {
    textTransform: 'uppercase',
    fontSize: wp('5%'),
    color: 'white',
    marginHorizontal: wp('7%'),
  },
  editView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('5%'),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  imageView: {
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('10%'),
    backgroundColor: '#FFFFFF',
    marginTop: wp('5%'),
    width: wp('100%'),
  },
  insideView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbImage: {
    width: wp('70%'),
    height: wp('70%'),
  },
  editImage: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    tintColor: '#FFFFFF',
  },
  galleryView: {
    height: wp('20%'),
    width: wp('20%'),
    backgroundColor: Color.purple,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryImg: {
    height: wp('7%'),
    width: wp('7%'),
    tintColor: 'white',
  },
  postTextView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonView: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickContainer: {
    borderWidth: 1,
    borderColor: Color.orange,
    marginTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    width: '100%',
    paddingVertical: wp('17%'),
  },
  addLessonBtnContainer: {
    backgroundColor: Color.orange,
    borderRadius: 4,
    paddingHorizontal: wp('3%'),
    paddingVertical: wp('2%'),
  },
  introText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#1F1F1F',
    fontSize: wp('5%'),
  },
});

export default CreatePost;

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {db, authentication, storage} from '../../db/firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {Color} from '../../UI/GlobalStyles';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from 'firebase/firestore/lite';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ViewImage = ({navigation, route}) => {
  const [thumbnail, setThumbnail] = useState({});
  const [photos, setPhotos] = useState('');
  const [caption, setCaption] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getImageFromNavigation();
    getProfile();
  }, []);

  const getProfile = async () => {
    const userDocRef = doc(db, 'users', authentication.currentUser.email);
    const docSnap = await getDoc(userDocRef);
    console.log(docSnap, 'snap');
    const profileData = docSnap.data();

    setProfile({
      username: profileData.username,
      profile_img: profileData.profile_img,
      profile_id: profileData.user_id,
      email: profileData.email,
    });
  };

  const addPost = imageUrl => {
    addDoc(
      collection(db, `users/${authentication.currentUser.email}`, 'posts'),
      {
        post_id: 'p_' + new Date().getTime(),
        crated_at: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        username: profile.username,
        profile_img: profile.profile_img,
        profile_id: profile.profile_id,
        email: profile.email,
        caption: caption,
        imageUrl: imageUrl,
        liked: [],
        comments: [],
      },
    )
      .then(() => {
        console.log('Post created successfully!');
      })
      .catch(e => {
        console.log(e, 'error creating post');
      });
  };

  const getImageFromNavigation = () => {
    if (route?.params?.imageString) {
      setThumbnail(route?.params?.imageString);
      setPhotos(route?.params?.imageString);
    }
  };

  const uploadImageHandler = async () => {
    const uri = photos !== '' ? photos : thumbnail?.path;
    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uploadUri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, 'images/' + 'image_' + Date.now());

    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
        console.log(error, 'error while uploading');
      },
      () => {
        console.log('Image uploaded successfully!!');
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          addPost(downloadURL);
        });
      },
    );
    navigation.navigate('Feed');
  };

  const captionHandler = input => {
    setCaption(input);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.imageView}>
          <Image
            source={{uri: photos !== '' ? photos : thumbnail?.path}}
            style={styles.img}
          />
        </View>
        <View style={styles.buttonView}>
          <TextInput
            placeholder="Add Caption"
            style={styles.caption}
            autoFocus={true}
            value={caption}
            onChangeText={input => captionHandler(input)}
          />
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={uploadImageHandler}>
            <Text style={[styles.btnText]}>Upload</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: Color.purple,
    borderRadius: 20,
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  imageView: {
    marginTop: '40%',
  },
  caption: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonView: {
    marginTop: wp('7%'),
    marginBottom: wp('3%'),
    width: wp('60%'),
  },
});

export default ViewImage;

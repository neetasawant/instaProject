import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {db, authentication} from '../../db/firebase';
import {
  doc,
  getDoc,
  getDocs,
  collectionGroup,
  query,
} from 'firebase/firestore/lite';
import {Color} from '../../UI/GlobalStyles';
import ProfileGallery from './ProfileGallery';

const Profile = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    getProfile();
    setTimeout(() => {
      getPosts();
    }, 500);
  }, []);

  const getProfile = async () => {
    const userDocRef = doc(db, 'users', authentication.currentUser.email);
    const docSnap = await getDoc(userDocRef).catch(e => console.log(e));

    const profileData = docSnap.data();
    console.log(profileData, 'snap');
    setProfileImage(profileData.profile_img);
    setProfileName(profileData.username);
    setProfile({
      username: profileData.username,
      profile_img: profileData.profile_img,
      profile_id: profileData.profile_id,
      email: profileData.email,
    });
  };

  const getPosts = async () => {
    let AllPosts = [];
    const posts = query(collectionGroup(db, 'posts'));
    const snapshot = await getDocs(posts);

    snapshot.forEach(elem => {
      let urlData = {};
      urlData['uri'] = elem.data().imageUrl;
      if (elem.data().email === authentication.currentUser.email) {
        AllPosts.push(urlData);
      }
    });

    setPosts(AllPosts);
  };

  const handleSignout = async () => {
    try {
      setPosts('');
      await authentication.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error, 'error logging out');
    }
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header]}>
        {profileImage !== '' && (
          <Image
            source={{uri: profileImage}}
            style={styles.profile}
          />
        )}
        {profileImage === '' && (
          <Image
            source={require('../../assets/profile.png')}
            style={styles.defaultProfile}
          />
        )}
        <Text>{profileName}</Text>
      </View>
      <View style={[styles.userInfo]}>
        <View style={styles.section}>
          <Text style={styles.space}>
            {posts.length != 0 ? posts.length : 0}
          </Text>
          <Text appearance="hint" category="s2">
            Posts
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.space}>0</Text>
          <Text appearance="hint" category="s2">
            Followers
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.space}>0</Text>
          <Text appearance="hint" category="s2">
            Following
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} 
        onPress={handleSignout}>
          <Text style={styles.text}>LOGOUT</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('coming soon!')}>
          <Text style={styles.text}>MESSAGE</Text>
        </TouchableOpacity>
      </View>

      <ProfileGallery posts={posts} />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  profile:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Color.purple,
    borderWidth: 4,
  },
  defaultProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Color.purple,
    borderWidth: 4,
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  section: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: 3,
    color: 'black',
  },
  separator: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 3,
    height: 42,
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: Color.purple,
    color: 'white',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;

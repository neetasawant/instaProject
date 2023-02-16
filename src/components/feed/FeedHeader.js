import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const FeedHeader = ({post}) => (
  <View style={styles.main}>
    <View style={styles.profile}>
      <Image
        source={{
          uri: post.profile_img,
        }}
        style={styles.story}
      />
      <Text
        style={{
          color: 'black',
          marginLeft: 5,
          fontWeight: '700',
        }}>
        {' '}
        {post.username}{' '}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  profile:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  story: {
    width: 35,
    height: 35,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
    borderRadius: 35,
  }
});
export default FeedHeader;

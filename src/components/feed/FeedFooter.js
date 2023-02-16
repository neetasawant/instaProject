import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const FeedFooter = ({post, status, handleLike}) => (
  <View
    style={{
      flexDirection: 'row',
    }}>
    <View
      style={{
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
      }}>
      {!status && (
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            source={require('../../assets/heart.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      )}
      {status && (
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            source={require('../../assets/heart-filled.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      )}
    </View>
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
      }}>
    </View>
  </View>
);

export default FeedFooter;

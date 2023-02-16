import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewBase,
} from 'react-native';
const PostCaption = ({post}) => (
  <View style={styles.main}>
    <Text style={styles.fields}>
      <Text
        style={{
          fontWeight: '600',
        }}>
        {' '}
        {post.username}{' '}
      </Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginTop: 5,
  },
  fields: {
    color: 'black',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 12,
  }
});

export default PostCaption;

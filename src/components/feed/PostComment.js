import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const PostComment = ({post}) => (
  <>
    {post.comments &&
      post.comments.map((comment, index) => (
        <View
          key={Math.random()}
          style={styles.main}>
          <Text
            style={styles.fields}>
            <Text
              style={{
                fontWeight: '600',
              }}>
              {' '}
              {comment.username}{' '}
            </Text>
            <Text>{comment.comment}</Text>{' '}
          </Text>
        </View>
      ))}
  </>
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
  }
});
export default PostComment;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const PostCommentSection = ({post, isClicked, handleComments}) => (
  <View style={styles.main}>
    {isClicked && (
      <View>
        <TextInput placeholder="Add comment" />
        <TouchableOpacity onPress={handleComments}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    )}
    {!!post.comments.length && (
      <Text style={{color: 'gray'}}>
        View{post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  main: {
    marginTop: 5, 
    marginBottom: 10
  },
  story: {
    width: 35,
    height: 35,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
    borderRadius: 35,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  shareicon: {
    transform: [
      {
        rotate: '320deg',
      },
    ],
    marginTop: -3,
  },
});

export default PostCommentSection;

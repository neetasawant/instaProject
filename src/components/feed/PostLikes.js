import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const PostLikes = ({post}) => (
    <View style={styles.main}>
      <Text style={styles.likes}>{post.liked.length} likes</Text>
    </View>
  );

  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      marginTop: 4,
      paddingLeft: 16
    },
    likes: {
      color: 'black',
      fontWeight: '600',
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

  export default PostLikes
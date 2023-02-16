import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

const FeedImage = ({post}) => (
    <View tyle={styles.main}>
      <Image
        source={{uri: post.imageUrl}}
        style={styles.img}
      />
    </View>
  );

  const styles = StyleSheet.create({
    main: {
      width: '100%',
      height: 450,
    },
    img: {
      width: '100%',
      height: 450,
    }
  });

export default FeedImage
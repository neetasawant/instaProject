import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

const ProfileGallery = ({posts}) => {
  const itemSize = (Dimensions.get('window').width - 12) / 3;

  return (
    <View style={styles.images}>
      {posts.length === 0 && (
        <View>
          <Text style={{color: 'black'}}>No Photos To View</Text>
        </View>
      )}
      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={index => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            style={{
              width: itemSize,
              height: itemSize,
              margin: 1.5,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    paddingHorizontal: 0.5,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});

export default ProfileGallery;

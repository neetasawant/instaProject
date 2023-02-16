import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {db, authentication} from '../../db/firebase';
import {
  doc,
  getDocs,
  collectionGroup,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore/lite';
import {Divider} from 'react-native-elements';
import FeedHeader from './FeedHeader';
import FeedImage from './FeedImage';
import PostLikes from './PostLikes';
import PostCommentSection from './PostCommentSection';
import PostComment from './PostComment';
import PostCaption from './PostCaption';
import FeedFooter from './FeedFooter';

const Feed = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const posts = query(collectionGroup(db, 'posts'));
    const snapshot = await getDocs(posts);
    setPosts(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
  };

  const handleLike = async post => {
    const status = !post.liked.includes(
      authentication.currentUser.email,
    );
    const ref = doc(db, `users/${post.email}/posts`, post.id);

    try {
      await updateDoc(ref, {
        liked: status
          ? arrayUnion(authentication.currentUser.email)
          : arrayRemove(authentication.currentUser.email),
      });
      console.log('Liked!');
    } catch (error) {
      console.log('Error on like: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Divider width={1} orientation="vertical" />
      {posts.length === 0 && (
        <View>
          <Text style={{color: 'black'}}>No posts yet! Add some!!</Text>
        </View>
      )}
      {posts.map((post, index) => {
        return (
          <View key={index}>
            <FeedHeader post={post} />
            <FeedImage post={post} />
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 10,
              }}>
              <FeedFooter
                post={post}
                handleLike={handleLike}
                status={post.liked.includes(authentication.currentUser.email)}
              />
            </View>
            <PostLikes post={post} />
            <PostCaption post={post} />
            <PostCommentSection post={post} />
            <PostComment post={post} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
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

export default Feed;

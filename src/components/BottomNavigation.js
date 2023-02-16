import {Image, Button, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from './feed/Feed';
import CreatePost from './posts/CreatePost';
import Profile from './profile/Profile';
const Tab = createBottomTabNavigator();

const BottomNavigation = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          cardStyle: {
            backgroundColor: 'white',
          },
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
              <Image
                source={require('../assets/previous.png')}
                style={{marginLeft: 20, height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/home.png')}
                style={{height: 30, width: 30}}
              />
            );
          },
        }}
        tabBarOptions={{
          activeTintColor: '#5D3891',
        }}
      />
      <Tab.Screen
        name="Posts"
        component={CreatePost}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
              <Image
                source={require('../assets/previous.png')}
                style={{marginLeft: 20, height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/add.png')}
                style={{height: 25, width: 25}}
              />
            );
          },
        }}
        tabBarOptions={{
          activeTintColor: '#5D3891',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
              <Image
                source={require('../assets/previous.png')}
                style={{marginLeft: 20, height: 20, width: 20}}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={require('../assets/user.png')}
                style={{height: 25, width: 25}}
              />
            );
          },
        }}
        tabBarOptions={{
          activeTintColor: '#5D3891',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

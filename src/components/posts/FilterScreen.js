import React, {useRef, useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../../UI/GlobalStyles';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from 'react-native';
import { FILTERS } from '../../helpers/Filters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const FilterScreen = ({navigation, route}) => {
  LogBox.ignoreAllLogs();
  const [selectedFilterIndex, setIndex] = useState(0);
  const [image, SetImage] = useState('');
  const [thumbnail, setThumbnail] = useState({});

  useEffect(() => {
    getImageFromNavigation();
  });

  const getImageFromNavigation = () => {
    if (route?.params?.imageData) {
      setThumbnail(route?.params?.imageData);
    }
  };

  const onExtractImage = ({nativeEvent}) => {
    SetImage(nativeEvent.uri);
    extractedUri.current = nativeEvent.uri;
  };

  const onSelectFilter = selectedIndex => {
    console.log(selectedIndex, 'index');
    setIndex(selectedIndex);
  };

  const extractedUri = useRef(thumbnail?.path);

  const handleNextStepClick = async () => {
    if (selectedFilterIndex === 0) {
      navigation.navigate('ViewImage', {imageString: thumbnail?.path});
    } else {
      console.log('goinfFromHere', image);
      navigation.navigate('ViewImage', {imageString: image});
    }
  };

  const renderFilterComponent = ({item, index}) => {
    const FilterComponent = item.filterComponent;
    const image = (
      <Image
        style={styles.filterSelector}
        source={{uri: thumbnail?.path}}
        defaultSource={require('../../assets/Pick.png')}
      />
    );
    return (
      <TouchableOpacity
        onPress={() => onSelectFilter(index)}
        style={{marginTop: 50}}>
        <Text style={styles.filterTitle}>{item.title}</Text>
        <FilterComponent image={image} />
      </TouchableOpacity>
    );
  };

  const SelectedFilterComponent = FILTERS[selectedFilterIndex].filterComponent;

  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        resetScrollToCoords={{x: 0, y: 0}}>
        {selectedFilterIndex === 0 ? (
          <Image
            style={styles.default_Img}
            source={{uri: thumbnail?.path}}
            resizeMode="contain"
          />
        ) : (
          Object.keys(thumbnail).length && (
            <SelectedFilterComponent
              onFilteringError={({nativeEvent}) =>
                console.log('show-error', nativeEvent.message)
              }
              onExtractImage={onExtractImage}
              extractImageEnabled={true}
              image={
                <Image
                  style={styles.default_Img}
                  source={{uri: thumbnail?.path}}
                  resizeMode="contain"
                />
              }
            />
          )
        )}
        <FlatList
          data={FILTERS}
          keyExtractor={item => item.title}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={renderFilterComponent}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={handleNextStepClick}>
            <Text style={[styles.btnText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default_Img: {
    flex: 1,
    width: 300,
    height: 300,
    bottom: 20,
    top: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  keyboardContainer: {
    width: wp('100%'),
  },
  buttonView: {
    marginTop: wp('7%'),
    marginBottom: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5,
  },
  filterTitle: {
    marginTop: 70,
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: Color.purple,
    borderRadius: 20,
    height: hp('5%'),
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});
export default FilterScreen;

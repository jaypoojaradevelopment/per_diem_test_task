import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets';
import {AppButton} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';
import storageHelper from '../../helper/storageHelper';
import {colors} from '../../utils/theme';
import {mobileHeight, mobileWidth} from '../../helper/responsive';

type IntroData = {
  image: number | undefined;
  heading: string;
  subheading: string;
};

const ENTRIES: IntroData[] = [
  {
    heading: 'Lets get started',
    subheading: 'Find the Best Coffee for you',
    image: Images.coffee,
  },
  {
    heading: 'To have all the fun...',
    subheading: 'Find the Best Place for it',
    image: Images.coffeeCup,
  },
  {
    heading: '',
    subheading: 'We help you find coffee to match your vibe',
    image: Images.coffee,
  },
];

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigation = useNavigation<AppNavigationProps>();

  const onNext = () => {
    setCurrentIndex(prev => prev + 1);
  };
  const onEnd = async () => {
    await storageHelper.saveItem(
      storageHelper.STORAGE_KEYS.IS_ON_BOARDING,
      'true',
    );
    navigation.replace('LoginScreen');
  };

  const onPrevious = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={ENTRIES[currentIndex].image} style={styles.image} />

      <View style={styles.bottomContainer}>
        <View style={styles.dotContainer}>
          {ENTRIES.map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={[
                  styles.dot,
                  currentIndex === index
                    ? styles.primaryBackground
                    : styles.grayBackground,
                ]}
              />
            );
          })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subTitle}>{ENTRIES[currentIndex].heading}</Text>
          <Text style={styles.title}>{ENTRIES[currentIndex].subheading}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {currentIndex === 0 ? (
            <AppButton
              title="Skip"
              style={styles.skipButton}
              isBorder={true}
              onPress={() => onEnd()}
            />
          ) : (
            <AppButton
              title="Previous"
              style={styles.skipButton}
              isBorder={true}
              onPress={() => onPrevious()}
            />
          )}

          {currentIndex === ENTRIES.length - 1 ? (
            <AppButton title="Finish" onPress={() => onEnd()} />
          ) : (
            <AppButton title="Next" onPress={() => onNext()} />
          )}
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    height: mobileHeight,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    width: mobileWidth,
    height: mobileHeight / 3,
  },
  textContainer: {
    gap: 20,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.black
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.black
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dotContainer: {flexDirection: 'row', gap: 10, justifyContent: 'center'},
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },
  grayBackground: {backgroundColor: colors.gray},
  primaryBackground: {backgroundColor: colors.primary},
});

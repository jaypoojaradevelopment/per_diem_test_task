import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets';
import {AppButton} from '../../components';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../../../App';

type IntroData = {
  image: number | undefined;
  heading: string;
  subheading: string;
};

const entries: IntroData[] = [
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
  const onEnd = () => {
    navigation.navigate('Auth');
  };

  const onPrevious = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={entries[currentIndex].image} style={styles.image} />

      <View style={styles.bottomContainer}>
        <View style={styles.dotContainer}>
          {entries.map((item, index) => {
            return (
              <View
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
          <Text style={styles.subTitle}>{entries[currentIndex].heading}</Text>
          <Text style={styles.title}>{entries[currentIndex].subheading}</Text>
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

          {currentIndex === 2 ? (
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

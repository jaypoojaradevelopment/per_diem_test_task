import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';
import {mobileHeight, mobileWidth} from '../../helper/responsive';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  image: {
    height: mobileHeight,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 30,
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
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
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

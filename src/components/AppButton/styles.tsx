import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

type AppButtonStyleProps = {
  isBorder: boolean;
};

export const getStyles = ({isBorder}: AppButtonStyleProps) =>
  StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 30,
      backgroundColor: colors.primary,
    },
    textStyle: {
      fontWeight: '800',
      color: isBorder ? colors.primary : colors.white,
    },
  });

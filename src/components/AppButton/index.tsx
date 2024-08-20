import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlightProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {colors} from '../../utils/theme';

type AppButtonProps = TouchableHighlightProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
  isBorder?: boolean;
  isLoading?: boolean;
};

export const AppButton = ({
  title,
  style,
  isBorder,
  isLoading,
  ...touchableOpacityProps
}: AppButtonProps) => {
  const styles = useMemo(() => {
    return getStyles({isBorder: isBorder ?? false});
  }, [isBorder]);

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      disabled={touchableOpacityProps.disabled || isLoading}
      style={[styles.container, style]}>
      {isLoading ? (
        <ActivityIndicator color={isBorder ? colors.primary : colors.white} />
      ) : (
        <Text style={styles.textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

type AppButtonStyleProps = {
  isBorder: boolean;
};

const getStyles = ({isBorder}: AppButtonStyleProps) =>
  StyleSheet.create({
    container: {
      height: 45,
      borderRadius: 8,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    textStyle: {
      fontWeight: '800',
      color: isBorder ? colors.primary : colors.white,
      textAlign: 'center',
    },
  });

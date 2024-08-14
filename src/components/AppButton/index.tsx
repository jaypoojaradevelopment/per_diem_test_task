import {
  StyleProp,
  Text,
  TouchableHighlightProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {getStyles} from './styles';

type AppButtonProps = TouchableHighlightProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
  isBorder?: boolean;
};

export const AppButton = ({
  title,
  style,
  isBorder,
  ...touchableOpacityProps
}: AppButtonProps) => {
  const styles = useMemo(() => {
    return getStyles({isBorder: isBorder ?? false});
  }, [isBorder]);

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[styles.container, style]}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

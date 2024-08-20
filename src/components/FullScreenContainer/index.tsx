import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../utils/theme';

const FullScreenContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

export default FullScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
});

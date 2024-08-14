import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.gray,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
});

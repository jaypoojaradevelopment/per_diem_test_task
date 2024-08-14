import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    shadowRadius: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    width: '65%',
    fontSize: 14,
    color: colors.black,
  },
  buttonView: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
  },
});

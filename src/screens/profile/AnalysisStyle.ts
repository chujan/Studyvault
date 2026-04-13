import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  /* ================= CONTAINER ================= */
 container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  header: {
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: RS(29),
  },

  headerTitle: {
    fontSize: RS(16),
    fontFamily: family.SemiBold,
    color: palette.black,
  },

});

import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  cardContainer: {
    backgroundColor: palette.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  email: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 4,
  },

  menuSection: {
    paddingVertical: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingLeft: 20,
    paddingRight: 28,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    marginLeft: -9,
  },

  header: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: palette.gray,
  },

  backButton: {
    position: 'absolute',
    left: RS(20),
    padding: RS(8),
  },

  headerTitle: {
    fontFamily: family.Bold,
    fontSize: RS(16),
    color: palette.black,
  },

  menuText: {
    fontSize: 15,
    fontFamily: family.Medium,
    color: '#1A1A1A',
  },

  arrowRight: {
    marginRight: -22,
  },

  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.grayScale3,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputs: {
    height: 50,
  },
  inputFlex: {
    flex: 1,
    height: 50,
  },

  saveButton: {
    backgroundColor: palette.red,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: palette.white,
    fontSize: 18,
    fontFamily: family.SemiBold,
  },
});

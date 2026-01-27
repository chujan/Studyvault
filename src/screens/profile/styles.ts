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
});

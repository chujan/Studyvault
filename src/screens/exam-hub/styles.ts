import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
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

  scrollContent: {
    paddingTop: RS(20),
  },

  menuRow: {
    flexDirection: 'row',
    paddingHorizontal: RS(12),
    paddingVertical: RS(10),
    justifyContent: 'space-between',
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
  },

  menuIconCircle: {
    width: RS(50),
    height: RS(50),
    borderRadius: RS(25),
    backgroundColor: '#EBF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RS(6),
  },

  menuImage: {
    width: RS(32),
    height: RS(32),
  },

  menuText: {
    fontSize: RS(12),
    fontFamily: family.Medium,
    color: palette.black,
    textAlign: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    paddingHorizontal: RS(29),
    paddingVertical: RS(10),
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: RS(16),
    fontFamily: family.SemiBold,
    color: palette.black,
  },

  pastHeader: {
    flexDirection: 'row',
    paddingHorizontal: RS(29),
    paddingVertical: RS(10),
    justifyContent: 'space-between',
    marginTop: RS(40),
    marginBottom: RS(16),
  },

  pastTitle: {
    fontSize: RS(16),
    fontFamily: family.SemiBold,
    color: palette.black,
  },

  newsContainer: {
    marginTop: RS(10),
  },

  newsRow: {
    paddingLeft: RS(29),
  },

  newsCard: {
    flexDirection: 'row', // horizontal layout
    width: RS(280),
    backgroundColor: '#F2F3F5',
    borderRadius: RS(16),
    marginRight: RS(16),
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  newsImageWrapper: {
    width: RS(80), // right-side image width
    height: '100%',
    
    borderRadius: RS(16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  newsImageLogo: {
    width: RS(60),
    height: RS(60),
    resizeMode: 'contain',
  },

  newsBody: {
    flex: 1, // text takes remaining space
    padding: RS(12),
    justifyContent: 'center',
  },

  newsTitle: {
    fontSize: RS(13),
    fontFamily: family.Medium,
    color: palette.black,
    marginBottom: RS(6),
  },

  newsMeta: {
    fontSize: RS(11),
    fontFamily: family.Regular,
    color: palette.gray,
  },
});

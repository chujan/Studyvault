import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
    
      /* ================= HEADER ================= */
      header: {
        height: RS(56),
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
      },
    
      backButton: {
        position: 'absolute',
        left: RS(20),
        padding: RS(6),
      },
    
      headerTitle: {
        fontSize: RS(16),
        fontWeight: '600',
        color: '#111',
      },

      newsCard: {
    width: '100%',
    backgroundColor: '#ebf3ffe9',
    borderRadius: RS(16),
    padding: RS(16), // add some padding inside
    marginTop: RS(16), // space from top
},

  newsCardContent: {
    padding: RS(16),
  },

  newsTitle: {
    fontFamily: family.Regular,
    fontSize: RS(14),
    color: palette.grey2,
  },
  scrollContent: {
    paddingHorizontal: RS(20),
    paddingTop: RS(16),
  },

  selectModeTitle: {
    marginTop: RS(10),
    fontFamily: family.Regular,
    fontSize: RS(14),
    color: palette.grey2,
  },

   selectTitle: {
    marginTop: RS(40),
    fontFamily: family.Regular,
    fontSize: RS(14),
    color: palette.grey2,
  },

  newsSubtitle: {
    marginTop: RS(25),
    fontFamily: family.Bold,
    fontSize: RS(16),
    color: palette.black,
  },

  textFieldContainer: {
  width: RS(340),
  marginTop: RS(20),
},

textFieldLabel: {
  fontFamily: family.SemiBold,
  fontSize: RS(14),
  color: palette.black,
  marginBottom: RS(8),
},

textField: {
  width: '100%',
  height: RS(50),
  borderWidth: 1,
  borderColor: palette.border2,
  borderRadius: RS(12),
  paddingHorizontal: RS(12),
  fontFamily: family.Regular,
  fontSize: RS(14),
  color: palette.black,
  backgroundColor: palette.white,
},

progressPill: {
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E88E5',
  },

  card: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 16,
    height: 420,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  tag: {
    backgroundColor: '#FFF2E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  navBtn: {
    padding: 12,
  },

  showAnswerBtn: {
    backgroundColor: '#2DBE60',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 12,
  },

  footerBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#EEE',
    alignItems: 'center',
    marginHorizontal: 6,
  },

  shuffle: {
    backgroundColor: '#2DBE60',
  },

  
});

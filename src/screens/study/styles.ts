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
 scrollContent: {
    paddingTop: RS(20),
    paddingHorizontal: RS(20),
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
  newsCard: {
    width: '100%',
    backgroundColor: "#EFE7E3",
     borderRadius: RS(10),
    
    padding: RS(15), // add some padding inside
    
},

Card: {
    width: '100%',
    backgroundColor: palette.brown,
     borderRadius: RS(10),
    
    
    
},

explainText: {
    color: '#FFF',
    fontSize: RS(14),
    fontWeight: '600',
  },

newsCardContent: {
    padding: RS(16),
  },

  newsTitle: {
    fontFamily: family.Regular,
    fontSize: RS(15),
    color: '#333'
  },
    explainBtn: {
    marginTop: RS(18),
    backgroundColor: palette.blue,
    paddingVertical: RS(12),
    borderRadius: RS(24),
    alignItems: 'center',
  },


});

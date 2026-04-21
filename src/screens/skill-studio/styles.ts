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
    left: RS(22),
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

  popularRow: {
    paddingLeft: RS(2),
    marginTop: RS(12)
  

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

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RS(30),
  },

  menuItem: {
    alignItems: 'center',
    width: '25%',
  },

  menuIconCircle: {
    width: RS(70),
    height: RS(70),
    borderRadius: RS(35),
    backgroundColor: '#EBF3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RS(6),
  },

  menuText: {
    fontSize: RS(12),
    fontFamily: family.Medium,
    color: palette.black,
    textAlign: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RS(20),
    marginBottom: RS(16),
  },

  sectionTitle: {
    fontSize: RS(16),
    fontFamily: family.SemiBold,
    color: palette.black,
  },

  sectionAction: {
    fontSize: RS(12),
    fontFamily: family.Medium,
    color: palette.blue,
  },

  courseCard: {
  width: RS(220),
  backgroundColor: palette.white,
  borderRadius: RS(18),
  padding: RS(14),
  marginRight: RS(16),

  borderWidth: 1,
  borderColor: '#E6E8EC',

  
},


  imageInset: {
   
    borderRadius: RS(18),
    
    //padding: RS(15), 
    marginBottom: RS(12),
  },
  star: {
  fontSize: RS(12),
  marginRight: RS(2),
  opacity: 0.45, 
},

  courseImage: {
    width: '100%',
    height: RS(110),
    borderRadius: RS(14),
    resizeMode: 'cover',
  },

  courseTitle: {
    fontSize: RS(14),
    fontFamily: family.SemiBold,
    color: palette.black,
    marginBottom: RS(4),
  },
   divider: {
  width: 1,              
  height: RS(12),         
  backgroundColor: palette.ashGray,
  marginHorizontal: RS(5),
},


  courseSub: {
    fontSize: RS(12),
    fontFamily: family.Regular,
    color: palette.ashGray,
  },

  continueCard: {
  backgroundColor: '#fff',
  padding: RS(16),
  borderRadius: RS(12),
  marginBottom: RS(16),
},

progressBg: {
  height: 6,
  backgroundColor: '#eee',
  borderRadius: 10,
  marginTop: RS(10),
},

progressFill: {
  width: '40%',
  height: 6,
  backgroundColor: palette.blue,
  borderRadius: 10,
},

resumeBtn: {
  marginTop: RS(10),
},

filterBtn: {
  height: RS(44),
  width: RS(44),
  borderRadius: RS(10),
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
},

skillCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: RS(12),
  borderRadius: RS(10),
  marginBottom: RS(10),
},

badge: {
  marginTop: 4,
  fontSize: 10,
  color: palette.blue,
},



});

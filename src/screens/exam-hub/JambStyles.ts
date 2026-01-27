import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

  /* ---------------- HEADER ---------------- */
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

  /* ---------------- CONTENT ---------------- */
  scrollContent: {
    paddingHorizontal: RS(20),
    paddingTop: RS(16),
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

  newsSubtitle: {
    marginTop: RS(25),
    fontFamily: family.Bold,
    fontSize: RS(16),
    color: palette.black,
  },

  imageTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RS(12),
  },

  rowImage: {
    width: RS(40),
    height: RS(40),
    borderRadius: RS(8),
    marginRight: RS(12),
  },

  rowText: {
    fontFamily: family.Bold,
    fontSize: RS(18),
    color: palette.black,
    flex: 1,
  },

  selectedText: {
    fontFamily: family.Bold,            
    fontSize: RS(18),
    color: palette.grayScale2   ,
    marginRight: 100,
   

   
  },

 selectModeTitle: {
    marginTop: RS(10),
    fontFamily: family.Regular,
    fontSize: RS(14),
    color: palette.grey2,
  },

  subjectCard: {
    width: '100%',
    marginTop: RS(40),
    backgroundColor: '#EBF3FF',
    borderRadius: RS(16),
    padding: RS(16),
},
  subjectCardContent: {
    padding: RS(16),
  },

  subjectTitle: {
    fontFamily: family.SemiBold,
    fontSize: RS(16),
    color: palette.black,
  },

  
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RS(12),
  },

  radioBox: {
    width: RS(18),
    height: RS(18),
    borderRadius: RS(4),
    borderWidth: 1.5,
    borderColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
  },

  radioText: {
    marginLeft: RS(10),
    fontFamily: family.Regular,
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

practiceDurationCard: {
  marginTop: RS(32),
  backgroundColor: '#EBF3FF',
  borderRadius: RS(18),
  padding: RS(16),
},

practiceDurationTitle: {
  marginLeft: RS(8),
  fontFamily: family.SemiBold,
  fontSize: RS(16),
  color: palette.grey2,
},

practiceDurationSubtitle: {
  marginTop: RS(6),
  fontFamily: family.Regular,
  fontSize: RS(13),
  color: palette.grayScale3,
},

durationWrap: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: RS(16),
  gap: RS(10),
},

durationBtn: {
  paddingVertical: RS(10),
  paddingHorizontal: RS(14),
  borderRadius: RS(12),
  borderWidth: 1,
  borderColor: palette.blue,
  backgroundColor: 'transparent',
},

durationBtnActive: {
  backgroundColor: palette.blue,
},

unlimitedBtn: {
  borderColor: '#7B2CFF',
},

unlimitedBtnActive: {
  backgroundColor: '#7B2CFF',
  borderColor: '#7B2CFF',
},

durationText: {
  fontFamily: family.Medium,
  fontSize: RS(14),
  color: palette.blue,
},

durationTextActive: {
  color: palette.white,
},

modeWrap: {
  marginTop: RS(16),
  gap: RS(12),
},

modeCard: {
  borderWidth: 1,
  borderColor: palette.border2,
  borderRadius: RS(14),
  padding: RS(14),
  backgroundColor: '#F2F3F5',
  
 
   shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
},

modeCardActive: {
  borderColor: palette.blue,
 backgroundColor: '#F2F3F5',
  
 
   shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
},

modeTitle: {
  fontFamily: family.SemiBold,
  fontSize: RS(15),
  color: palette.grey2
  
  
  
  
  
  
  
  ,
},

modeDesc: {
  marginTop: RS(4),
  fontFamily: family.Regular,
  fontSize: RS(13),
  color: palette.grayScale3,
},

proceedWrapper: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingHorizontal: RS(20),
  backgroundColor: palette.white,
  borderTopWidth: 1,
  borderTopColor: palette.border,
},

proceedBtn: {
  height: RS(52),
  borderRadius: RS(14),
  backgroundColor: palette.blue,
  alignItems: 'center',
  justifyContent: 'center',
},

proceedBtnDisabled: {
  backgroundColor: palette.blue,
},

proceedText: {
  fontFamily: family.Bold,
  fontSize: RS(16),
  color: palette.white,
},

headers: {
  backgroundColor: '#FFF3E5',
  padding: 20,
},

section: {
  padding: 20,
},

timeBadge: {
  backgroundColor: '#EAF9FF',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
  alignSelf: 'flex-start',
  marginTop: 10,
},

timeLabel: {
  alignSelf: 'flex-end',
  marginRight: 10,
},

timeCard: {
  backgroundColor: '#EAF9FF',
  marginHorizontal: 20,
  padding: 16,
  borderRadius: 12,
},

scoreCard: {
  backgroundColor: '#F4F1FF',
  margin: 20,
  padding: 16,
  borderRadius: 14,
},

subjectRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
},

rankButton: {
  marginTop: 12,         
  marginRight: 20,        
  marginLeft: 20,         
  paddingVertical: 14,
  paddingHorizontal: 30,  
  borderRadius: 30,
  borderWidth: 1,
  borderColor: palette.blue,
  alignSelf: 'flex-end',  
  alignItems: 'center',   
},

performanceButton: {
   marginTop: 12,  
  marginHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 50,   
  backgroundColor: '#007BFF',
  alignItems: 'center',
     
  paddingHorizontal: 37,      
},

goHomeButton: {
  marginHorizontal: 20,
  paddingVertical: 16,
   
  
  alignItems: 'center',
     
  paddingHorizontal: 37,      
},
sheetItem: {
    paddingVertical: RS(16),
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
 


});

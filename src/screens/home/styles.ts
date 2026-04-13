import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.whiteBg,
    paddingTop: RS(70),
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: RS(20),
  },

  /* ---------- HEADER ---------- */
  header: {
    paddingHorizontal: RS(30),
    marginBottom: RS(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: RS(40),
    height: RS(40),
    borderRadius: RS(20),
  },

  profileName: {
    marginLeft: RS(10),
    fontSize: RS(14),
    fontFamily: family.SemiBold,
    color: palette.black,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  /* ---------- HERO CARD ---------- */
  card: {
    backgroundColor: palette.blue,
    padding: RS(40),
    borderRadius: RS(30),
    marginBottom: RS(40),
  },

  cardTitle: {
    fontSize: RS(18),
    fontFamily: family.Regular,
    color: palette.white,
  },

  cardText: {
    fontSize: RS(14),
    color: palette.white,
  },

  /* ---------- MENU ---------- */
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

  /* ---------- SECTION HEADER ---------- */
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

  /* ---------- POPULAR COURSES ---------- */
  popularRow: {
    paddingLeft: RS(2),
    marginTop: RS(12)
  

  },

 courseCard: {
  width: RS(160),
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

  extraContent: {
    height: RS(600),
  },
});

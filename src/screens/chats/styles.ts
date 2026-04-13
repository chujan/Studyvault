import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },

   containers: {
    backgroundColor: palette.whiteBg,
    paddingTop: RS(70),
    flex: 1,
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


  
  headers: {
    paddingHorizontal: RS(30),
    marginBottom: RS(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  circleBtn: {
height: 40,
width: 40,
borderRadius: 20,
backgroundColor: "#F2F2F2",
alignItems: "center",
justifyContent: "center"
},

schoolIcon: {
height: 40,
width: 40,
borderRadius: 20,
backgroundColor: "#E8F5E9",
alignItems: "center",
justifyContent: "center"
},

card: {
backgroundColor: "#FFF",
borderRadius: 14,
padding: 16,
marginBottom: 15,
borderWidth: 1,
borderColor: "#EEEEEE"
},

avatar: {
height: 40,
width: 40,
borderRadius: 20,
backgroundColor: "#DDD"
},

answerBtn: {
borderWidth: 1,
borderColor: "#E0E0E0",
paddingHorizontal: 18,
paddingVertical: 8,
borderRadius: 20
},

answerCount: {
backgroundColor: "#F8F8F8",
paddingHorizontal: 14,
paddingVertical: 8,
borderRadius: 20
},

schoolTag: {
alignSelf: "flex-start",
backgroundColor: "#E0F2F1",
paddingHorizontal: 12,
paddingVertical: 6,
borderRadius: 15
},

bottomArea: {
padding: 16,
backgroundColor: "#FFF"
},

askBtn: {
backgroundColor: "#0A0A18",
paddingVertical: 16,
borderRadius: 30,
alignItems: "center"
},



backArrow:{
fontSize:18
},

title:{
fontSize:22,
marginTop:15,
fontFamily:family?.Bold
},

label:{
marginTop:25,
marginLeft:10,
fontSize:16,
fontFamily:family?.Medium
},

dropdown:{
  marginTop:10,
  marginHorizontal:10,
  height:55,
  borderWidth:1,
  borderColor:'#DADADA',
  borderRadius:12,
  paddingHorizontal:15,
  flexDirection:'row',
  alignItems:'center',
  paddingLeft:15, 
  backgroundColor:'#FFF'
},

arrow:{
   fontSize:14,
  position:'absolute',
  right:20,         // distance from right edge
  //top:'50%',
  //transform:[{translateY:-7}],
},


dropdownText:{
fontSize:16
},

placeholder:{
fontSize:16,
color:'#999'
},



textArea:{
marginTop:10,
marginHorizontal:10,
height:130,
borderWidth:1,
borderColor:'#DADADA',
borderRadius:12,
padding:15,
textAlignVertical:'top',
backgroundColor:'#FFF'
},

checkRow:{
flexDirection:'row',
marginTop:20,
marginHorizontal:20,
alignItems:'flex-start'
},

checkbox:{
width:22,
height:22,
borderRadius:4,
backgroundColor:'#C00000',
justifyContent:'center',
alignItems:'center',
marginRight:10
},

tick:{
color:'#FFF',
fontSize:14
},

checkText:{
flex:1,
fontSize:14,
lineHeight:20
},

bottomButtonContainer:{
position:'absolute',
bottom:0,
left:0,
right:0,
backgroundColor:'#FFF',
paddingHorizontal:20,
paddingTop:15
},

button:{
height:60,
borderRadius:35,
backgroundColor:'#C00000',
justifyContent:'center',
alignItems:'center'
},

buttonText:{
color:'#FFF',
fontSize:18,
fontFamily:family?.Bold
},

dropdownMenu: {
  backgroundColor: palette.white,
  borderRadius: RS(8),
  marginTop: RS(5),
  overflow: 'hidden',
},

dropdownItem: {
  paddingVertical: RS(14),
  paddingHorizontal: RS(16),
  borderBottomWidth: 1,
  borderBottomColor: '#EEEEEE',
},

dropdownItemText: {
  fontSize: RS(14),
},

headeres: {
    paddingHorizontal: RS(20),
    paddingBottom: RS(10),
  },

  backBtn: {
    position: 'absolute',
    left: RS(20),
  },

  cards: {
    marginHorizontal: RS(20),
    marginTop: RS(20),
    borderRadius: RS(12),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: RS(15),
  },

  avatars: {
    width: RS(40),
    height: RS(40),
    borderRadius: RS(20),
    backgroundColor: '#D9D9D9',
  },

  menu: {
    marginLeft: 'auto',
    fontSize: 20,
  },

  answerText: {
    marginTop: RS(15),
    fontSize: RS(15),
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginVertical: RS(15),
  },

  actionBtn: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: RS(20),
    paddingHorizontal: RS(15),
    paddingVertical: RS(6),
    alignItems: 'center',
  },

  inputBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: RS(15),
    backgroundColor: palette.white,
  },

  imageBtn: {
    width: RS(45),
    height: RS(45),
    borderRadius: RS(25),
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RS(10),
  },

  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C53B3B',
    borderRadius: RS(25),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RS(15),
  },

  input: {
    flex: 1,
   
    
    height: RS(45),
  },

  sendBtn: {
    paddingLeft: RS(10),
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  containered: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  heade: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeBtn: {
    width: 40,
  },
  titles: {
    fontSize: 20,
    fontWeight: '600',
  },
  reset: {
    color: palette?.grey2 || 'red',
    fontWeight: '500',
  },
  carded: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  institutionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#777',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioText: {
    fontSize: 15,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: 'red',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  applyBtn: {
    backgroundColor: 'red',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  contain: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  /* HEADER */
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },

  back: {
    fontSize: 22,
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginHorizontal: 10,
  },

  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  groupTitle: {
    fontWeight: '600',
    fontSize: 16,
  },

  members: {
    fontSize: 12,
    color: '#777',
  },

  joinBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  joinText: {
    color: '#E53935',
    fontWeight: '600',
  },

  /* CARD */
  car: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  avatare: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  name: {
    fontWeight: '600',
  },

  time: {
    fontSize: 12,
    color: '#888',
  },

  menus: {
    fontSize: 18,
    color: '#999',
  },

  postText: {
    marginTop: 16,
    fontSize: 15,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  actionBtns: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
});
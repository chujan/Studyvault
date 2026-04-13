import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette } from '@components/theme';

export const styles = StyleSheet.create({

container: {
flex: 1,
backgroundColor: '#F7F7F7',
},

header: {
borderBottomWidth: 0,
},

backButton: {
width: RS(40),
height: RS(40),
borderRadius: RS(20),
borderWidth: 1,
alignItems: 'center',
justifyContent: 'center',
},

createButton: {
backgroundColor: '#C90A0A',
paddingHorizontal: RS(20),
paddingVertical: RS(10),
borderRadius: RS(25),
},

createText: {
color: '#fff',
fontSize: RS(14),
},

searchInput: {
height: RS(45),
backgroundColor: '#fff',
borderRadius: RS(25),
paddingHorizontal: RS(15),
borderWidth: 1,
borderColor: '#E6E6E6',
},

input: {
marginLeft: RS(10),
flex: 1,
},

filterButton: {
width: RS(45),
height: RS(45),
backgroundColor: '#0F0F0F',
borderRadius: RS(22),
alignItems: 'center',
justifyContent: 'center',
marginLeft: RS(10),
},

scrollContent: {
paddingHorizontal: RS(20),
},

groupCard: {
backgroundColor: '#fff',
borderRadius: RS(15),
padding: RS(14),
marginBottom: RS(12),
alignItems: 'center',
},

avatar: {
width: RS(45),
height: RS(45),
borderRadius: RS(22),
backgroundColor: '#F1C7C3',
},

groupTitle: {
fontSize: RS(14),
fontWeight: '500',
},

memberText: {
fontSize: RS(12),
color: '#888',
marginTop: RS(3),
},

joinButton: {
borderWidth: 1,
borderColor: palette.white,
paddingHorizontal: RS(16),
paddingVertical: RS(6),
borderRadius: RS(20),
},

joinText: {
color: palette.white,
fontSize: RS(13),
},

});
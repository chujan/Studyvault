import { StyleSheet } from 'react-native';
import { RS } from '@helpers';
import { palette, family } from '@theme';

export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontFamily: family.Bold,
    marginLeft: 12,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainCard: {
    backgroundColor: '#F7F7F7',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },

  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    marginRight: 8,
  },

  name: {
    fontFamily: family.Bold,
    fontSize: 14,
  },

  replyName: {
    fontFamily: family.Medium,
    fontSize: 14,
  },

  time: {
    fontSize: 12,
    color: '#888',
  },

  message: {
    marginTop: 12,
    fontSize: 16,
  },

  replyMessage: {
    marginTop: 10,
    fontSize: 15,
  },

  replyCount: {
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: family.Bold,
    marginBottom: 10,
  },

  replyCard: {
    backgroundColor: '#F7F7F7',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  actionText: {
    marginLeft: 5,
    fontSize: 13,
  },

  menu: {
    padding: 6,
  },

  inputContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#EEE',
  },



  sendBtn: {
    padding: 8,
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
     marginTop: 10,
    paddingHorizontal: RS(15),
  },

  input: {
    flex: 1,
    
    height: RS(45),
  },

});
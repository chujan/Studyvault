import {StyleSheet} from 'react-native';
import {palette, family} from '@theme';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },

  logo: {
    textAlign: 'center',
    fontSize: 22,
    color: '#E11D1D',
    fontFamily: family.Bold,
    marginTop: 20,
  },

  welcome: {
    fontSize: 32,
    fontFamily: family.Bold,
    marginTop: 40,
    marginBottom: 30,
  },

  appleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    marginTop: 40,
    height: 56,
  },

  appleText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: family.Medium,
  },

  or: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
  },

  getText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: family.Medium,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    fontSize: 15,
  },

  forgot: {
    textAlign: 'right',
    color: '#DC2626',
    marginBottom: 25,
  },

  loginBtn: {
    height: 58,
    borderRadius: 30,
    backgroundColor: '#C90A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: family.Bold,
  },

  terms: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
    color: '#6B7280',
  },

  link: {
    textDecorationLine: 'underline',
    color: '#374151',
  },

  bottom: {
    marginTop: 40,
  },

  create: {
    color: '#C90A0A',
    fontFamily: family.Bold,
  },


  containers: {
    flex: 1,
    backgroundColor: palette.white,
    padding: 24,
  },
  logos: {
    textAlign: 'center',
    fontSize: 24,
    color: palette.red,
    fontFamily: family.Bold,
    marginBottom: 40,
     marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: family.Bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: family.Medium,
    color: palette.ashGray3,
    marginBottom: 30,
  },
  inputContainers: {
    borderWidth: 1,
    borderColor: palette.grayScale3,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.grayScale3,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputs: {
    height: 50,
  },
  inputFlex: {
    flex: 1,
    height: 50,
  },
  createBtn: {
    backgroundColor: palette.red,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  createText: {
    color: palette.white,
    fontSize: 18,
    fontFamily: family.SemiBold,
  },
  login: {
    color: palette.red,
    fontFamily: family.SemiBold,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  
});
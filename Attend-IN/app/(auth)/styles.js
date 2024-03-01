import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12
  },
  imageContainer: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  logo: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20
  },
  buttonContainer: {
    backgroundColor: '#30529c',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8
  },
  landingButton: {
    backgroundColor: '#30529c',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 275,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'serif',
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    padding: 3
  },
  textInput: {
    borderColor: '#cecece',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    margin: 8,
    textAlign: 'center',
    backgroundColor: '#d9d9d9'
  },
  text: {
    fontFamily: 'Tinos',
    textAlign: 'center'
  },
  topText: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    margin: 8
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Tinos',
    fontWeight: 'normal',
    fontSize: 60,
    alignSelf: 'center',
    marginTop: -100
  }
});

export default styles;

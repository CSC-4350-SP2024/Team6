import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12
  },
  imageContainer: {
    flex: 1
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
    height: 280,
    alignSelf: 'center'
  },
  verticallySpaced: {
    paddingTop: 6,
    paddingBottom: 6,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 30,
    marginBottom: 30
  },
  buttonContainer: {
    backgroundColor: '#30529c',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8,
    width: 200
  },
  landingButton: {
    backgroundColor: '#30529c',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'serif',
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 3
  },
  textInput: {
    borderColor: '#cecece',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    margin: 15,
    textAlign: 'center',
    backgroundColor: '#d9d9d9',
    width: 300,
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Tinos',
    textAlign: 'center'
  },
  topText: {
    paddingVertical: 6,
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
})

export default styles

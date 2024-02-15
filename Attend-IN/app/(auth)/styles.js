import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
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
    fontFamily: 'serif',
    textAlign: 'center'
  },
  topText: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    margin: 8
  }
})

export default styles

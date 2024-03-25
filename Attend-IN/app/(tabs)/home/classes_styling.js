import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popUpContainer: {
    position: 'absolute',
    top: '50%', // Adjust as needed
    left: '50%', // Adjust as needed
    transform: [{ translateX: -120 }, { translateY: -50 }],
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width:250, 
    height:250, 
    zIndex: 1, // Make sure it's above other content
    backgroundColor: '#E0EEF7',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center',
  },
  outerClassContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
    margin: 20
    
  },
  classItem: {
    height: '45%',
    width: '45%',
    marginBottom: 10,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: '1%',
    alignItems: 'center',
    backgroundColor: '#E0EEF7'
  },
  'className':{
    width: '100%',
    textAlign: 'center'
  },
  imageContainer: {
    width: 100,
    height: 100,
   
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: 'contain'
  },
  popUpText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f8f8f8', // Change background color as needed
    padding: 7, 
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black', 
    fontSize: 16, 
    textAlign: 'center', 
  },
});

export default styles;

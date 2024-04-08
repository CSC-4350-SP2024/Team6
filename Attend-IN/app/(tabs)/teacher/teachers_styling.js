import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  outerClassContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  classesContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classItem: {
    height: 100,
    width: 350,
    marginBottom: 10,
    padding: 20,
    borderWidth: 4,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  classItemGreen: {
    borderColor: '#00FF00', // Green border color
  },
  classItemBlue: {
    borderColor: '#0000FF', // Blue border color
  },
  classItemYellow: {
    borderColor: '#FFFF00', // Yellow border color
  },
  classItemRed: {
    borderColor: '#FF0000', // Red border color
  },
  
  className: {
    width: '100%', // Consider changing to a fixed value in pixels
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default styles;

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

  //reportScreen.js styling
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  cellText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#1044a9',
    width: '100%',
    height: '20%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: '10%',
    borderBottomWidth: 15,
    borderColor: '#D1DFFB'
  },
  promptText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingBottom: 10,
    
  },
});

export default styles;

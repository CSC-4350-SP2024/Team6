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

  //timeDetailScreen.js styling
  timecontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 0, 
  },
  timeheader: {
    backgroundColor: '#1044a9',
    width: '100%',
    height: '20%',
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: '10%',
    borderBottomWidth: 15,
    borderColor: '#D1DFFB'
  },
  timepromptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    
  },
  button: {
    backgroundColor: '#1044a9', // Darker shade when selected
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#D1DFFB',
    borderColor: '#E3242B', // Red border
    borderWidth: 2, // Border width
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  viewReportButton: {
    backgroundColor: '#E3242B', // Different color for View Report button
    marginTop: 60, 
    width: '70%',
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
    marginBottom: 0,
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

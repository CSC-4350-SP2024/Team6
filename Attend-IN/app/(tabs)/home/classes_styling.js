import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: '43%',
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  }
});

export default styles;

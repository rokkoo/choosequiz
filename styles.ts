import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  quesitonTextContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  quesitonText: {
    fontSize: 36,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    maxWidth: width / 2,
  },
});

import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'tomato',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 60,
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

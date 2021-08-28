import React from 'react';
import { ColorValue, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  Easing,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

const CIRCLE_SIZE = 60;

interface PointsProps {
  text: string;
  color: ColorValue;
}

const Points = ({ text, color = 'green' }: PointsProps) => {
  const animatedTexStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSequence(withTiming(1.2), withTiming(1)),
        },
      ],
    };
  }, [text]);

  return (
    <Animated.View
      style={[styles.container, animatedTexStyle, { backgroundColor: color }]}
    >
      <Text style={styles.pointsText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Points;

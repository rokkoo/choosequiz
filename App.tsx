import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './styles';
import Toast from './src/components/Toast';

const quesitons = [
  'I love cheese',
  'Like dogs',
  'I like cats',
  'a very loooonggg text to test :)',
];

export default function AnimatedStyleUpdateExample() {
  const x = useSharedValue(0);
  const release = useSharedValue(true);
  const next = useSharedValue(false);

  const [question, setQuestion] = useState(quesitons[0]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      //@ts-ignore
      ctx.startX = x.value;

      release.value = false;
    },
    onActive: (event, ctx) => {
      //@ts-ignore
      if (ctx && ctx?.startX) {
        //@ts-ignore
        x.value = ctx.startX + event.translationX;
      }
      //@ts-ignore
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      if (x.value < -10 || x.value > 10) {
        next.value = true;
      }

      x.value = withSpring(0, { damping: 60, mass: 1 });
      release.value = true;
    },
  });

  const animatedBackgroundColorStyle = useAnimatedStyle(() => {
    let color = '#273746';

    if (!release.value) {
      // Give 10 pixels of gap between the edges of the text
      const gap = 10;

      if (x.value < -gap) {
        color = '#2ECC71';
      }
      if (x.value > gap) {
        color = '#E74C3C';
      }
    }

    return {
      backgroundColor: color,
    };
  });

  const animatesTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  useDerivedValue(() => {
    if (next.value && release.value) {
      next.value = false;

      return runOnJS(setQuestion)(
        quesitons[Math.floor(Math.random() * quesitons.length) + 0]
      );
    }
  });

  return (
    <Animated.View style={[styles.container, animatedBackgroundColorStyle]}>
      <Toast />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.quesitonTextContainer}>
          <Animated.Text style={[styles.quesitonText, animatesTextStyle]}>
            {question}
          </Animated.Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

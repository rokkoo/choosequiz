import React, { useState, useMemo, useCallback } from 'react';
import { View } from 'react-native';
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
import Points from './src/components/Points';

const gap = 10;

export default function AnimatedStyleUpdateExample() {
  const x = useSharedValue(0);
  const release = useSharedValue(true);
  const next = useSharedValue(false);

  const [newNumbers, setNewNumbers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

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
      if (x.value < -gap || x.value > gap) {
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

  const ramdomNumberA = useMemo(() => {
    setNewNumbers(false);

    return Math.floor(Math.random() * 10);
  }, [newNumbers]);

  const ramdomNumberB = useMemo(
    () => Math.floor(Math.random() * 10),
    [newNumbers]
  );
  const ramdomResult = useMemo(
    () => Math.floor(Math.random() * ramdomNumberB) + ramdomNumberA,
    [ramdomNumberA, ramdomNumberB]
  );
  const correctAnswer = useMemo(
    () => ramdomNumberA + ramdomNumberB,
    [ramdomNumberA, ramdomNumberB]
  );

  const answer = useDerivedValue(() => {
    return x.value < -gap;
  });

  const isCorrectAnswer = useDerivedValue(() => {
    const showedresult = ramdomResult === correctAnswer;

    return showedresult === answer.value;
  }, [correctAnswer, ramdomResult]);

  const showAlert = useCallback(() => {
    if (isCorrectAnswer.value) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setNewNumbers(true);
  }, [isCorrectAnswer]);

  useDerivedValue(() => {
    if (next.value && release.value) {
      next.value = false;

      runOnJS(showAlert)();
    }
  });

  return (
    <Animated.View style={[styles.container, animatedBackgroundColorStyle]}>
      <View style={styles.header}>
        <Points text={correctAnswers.toString()} color={'#2ECC71'} />
        <Toast text={`${ramdomNumberA}+${ramdomNumberB}`} />
        <Points text={wrongAnswers.toString()} color={'#E74C3C'} />
      </View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.quesitonTextContainer}>
          <Animated.Text style={[styles.quesitonText, animatesTextStyle]}>
            {ramdomResult}
          </Animated.Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

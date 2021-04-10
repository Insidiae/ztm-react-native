import React, { useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = min => min * 60 * 1000;

const formatTime = time => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const [millis, setMillis] = useState(null);
  const interval = useRef(null);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  const handleCountdown = () => {
    setMillis(time => {
      if(time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if(millis === 0) onEnd();
  }, [millis]);

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "rgba(94, 132, 226, 0.3)",
    padding: spacing.lg,
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
  }
});

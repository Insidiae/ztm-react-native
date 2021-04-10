import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { Timing } from "./Timing";
import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";

import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

const DEAFULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, onClearSubject}) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEAFULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const handleProgress = progress => {
    setProgress(progress);
  };

  const vibrate = () => {
    if(Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(clearInterval(interval), 3000);
    } else {
      Vibration.vibrate(3000);
    }
  }

  const handleEnd = () => {
    vibrate();
    setMinutes(DEAFULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const handleChangeTime = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={handleProgress}
          onEnd={handleEnd}
        />
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color={colors.lightBlue}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={handleChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="pause"
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="start"
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => onClearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  progressBar: {
    height: spacing.sm,
    marginTop: spacing.sm,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
  },
});

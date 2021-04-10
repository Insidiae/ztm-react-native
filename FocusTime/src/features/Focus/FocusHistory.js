import React from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { RoundedButton } from "../../components/RoundedButton";

import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";

const HistoryItem = ({item, index}) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({focusHistory, onClearHistory}) => {
  const clearHistory = () => {
    onClearHistory();
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Things we've focused on:</Text>
        {focusHistory.length ? (
          <>
            <FlatList
              style={styles.listComponent}
              contentContainerStyle={styles.listContainer}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                title="clear"
                size={75}
                onPress={clearHistory}
              />
            </View>
          </>
        ) : (
          <Text style={styles.noItems}>
            Nothing yet. Try adding a task to focus on!
          </Text>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: "center",
  },
  title: {
    color: colors.white,
  },
  listComponent: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
  },
  noItems: {
    color: colors.white,
  },
  historyItem: status => ({
    color: status === 1
      ? colors.green
      : colors.red,
  }),
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});

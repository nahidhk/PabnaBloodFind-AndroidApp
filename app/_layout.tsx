import React, {
  useEffect
} from "react";
import {
  StyleSheet,
  Platform,
  useColorScheme,
  StatusBar,
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  Stack
} from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

import Navbar from "@/components/Nav";

export default function Layout() {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#242424": "#C9C9C9";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(bgColor, false);
      NavigationBar.setButtonStyleAsync(
        colorScheme === "dark" ? "light": "dark"
      );
    }
  },
    [colorScheme]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container,
        { backgroundColor: bgColor }]}
      >
      <StatusBar
        translucent={false}
        backgroundColor={bgColor}
        barStyle={colorScheme === "dark" ? "light-content": "dark-content"}
        />

      {/* App Navigation */}
      <Stack
        screenOptions={ {
          header: () => <Navbar />,
        }}
        />
    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
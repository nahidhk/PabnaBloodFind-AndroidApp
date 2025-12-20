// app/_layout.tsx

import React, { useEffect } from "react";
import {
  StyleSheet,
  Platform,
  useColorScheme,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";

import Navbar from "@/components/Nav";
import updateData from "../data/update.json";
import style from "../app/style/style";

// the data

export default function Layout() {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#242424" : "#C9C9C9";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(bgColor, false);
      NavigationBar.setButtonStyleAsync(
        colorScheme === "dark" ? "light" : "dark"
      );
    }
  }, [colorScheme]);

  return (
    <SafeAreaView edges={["top"]} style={[styles.container, { backgroundColor: bgColor }]}>
      
      <StatusBar
        translucent={false}
        backgroundColor={bgColor}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <Stack
        screenOptions={{
          header: () => <Navbar />, // 🔥 HERE
        }}
      />




      {/* UPDATE MODAL */}
      {updateData.popup && (
        <Modal transparent visible animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={style.popup}>
              <Text style={styles.popupTitle}>{updateData.title}</Text>
              <Text style={styles.popupMessage}>{updateData.message}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        updateData.cancelButtonTitle.btnColorCode,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: updateData.cancelButtonTitle.textColor,
                      fontWeight: "bold",
                    }}
                  >
                    {updateData.cancelButtonTitle.title}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#00aaff" }]}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    {updateData.conformButtonTitle}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },

});
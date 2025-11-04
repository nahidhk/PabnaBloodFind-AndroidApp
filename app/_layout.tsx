// Layout.tsx
import React, { useEffect } from "react";
import {
  StyleSheet,
  Platform,
  useColorScheme,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Navbar from "@/components/Nav";
import * as NavigationBar from "expo-navigation-bar";
import updateData from "../data/update.json";
import style from "../app/style/style";

export default function Layout() {
  const colorScheme = useColorScheme();

  // Set Android Navigation Bar color
  useEffect(() => {
    const init = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync(
          colorScheme === "dark" ? "#292929" : "#FFFFFF",
          false
        );
        await NavigationBar.setButtonStyleAsync(
          colorScheme === "dark" ? "light" : "dark"
        );
      }
    };
    init();
  }, [colorScheme]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#242424" : "#C9C9C9" },
      ]}
    >
      {/* StatusBar */}
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#242424" : "#C9C9C9"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />

      {/* Update Modal */}
      {updateData.popup && (
        <Modal
          transparent
          visible
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={style.popup}>
              <Text style={styles.popupTitle}>{updateData.title}</Text>
              <Text style={styles.popupMessage}>{updateData.message}</Text>

              <View style={styles.buttonRow}>
                {/* Cancel Button */}
                <TouchableOpacity
                  onPress={() => console.log("Cancel pressed")}
                  style={[
                    styles.button,
                    { backgroundColor: updateData.cancelButtonTitle.btnColorCode },
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

                {/* Confirm Button */}
                <TouchableOpacity
                  onPress={() => console.log("Confirm pressed")}
                  style={[
                    styles.button,
                    { backgroundColor: "#00aaff" }, // Customize your confirm button color
                  ]}
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
  container: {
    flex: 1,
  },
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    alignItems: "center",
  },
});

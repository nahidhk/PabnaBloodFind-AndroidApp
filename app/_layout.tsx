import React, { useEffect } from "react";
import { StyleSheet, Platform, useColorScheme, View, Text, Modal, Button, TouchableOpacity ,Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Navbar from "@/components/Nav";
import * as NavigationBar from "expo-navigation-bar";
import updateData from "../data/update.json";
import style from "../app/style/style";

export default function Layout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setBackgroundColorAsync(
          colorScheme === "dark" ? "#292929ff" : "#fff",
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
        { backgroundColor: colorScheme === "dark" ? "#242424ff" : "#c9c9c9ff" },
      ]}
    >
      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />
      {
        updateData.popup === true ? (
          <Modal
            transparent={true}
            visible={true}
            animationType="slide"
          // onRequestClose={}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View style={style.popup}>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                  {updateData.title}
                </Text>
                <Text>
                  {updateData.message}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", width: "100%" }}>
                  <TouchableOpacity
                    onPress={() => console.log("Cancel pressed")}
                    style={{
                      backgroundColor: updateData.cancelButtonTitle.btnColorCode,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 3,
                      alignSelf: "flex-start",
                     
                    }}
                  >
                    <Text onPress={() => updateData.cancelButtonTitle.buttonJSCode} style={{ color: updateData.cancelButtonTitle.textColor, fontWeight: "bold" }}>
                      {updateData.cancelButtonTitle.title}
                    </Text>
                  </TouchableOpacity>


                  <Button title={updateData.conformButtonTitle} />
                </View>
              </View>
            </View>
          </Modal>
        ) : null
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
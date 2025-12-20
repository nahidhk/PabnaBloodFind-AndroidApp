import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking, Animated, Image } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import style from "@/app/style/style";
import mySetting from "@/data/setting.json";
import appData from "@/app.json"



export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Slide animation
  const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuOpen(false));
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <View style={[style.navbar, style.sTop]}>


        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons
              name={menuOpen ? "close-outline" : "menu-outline"}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff", marginLeft: 15 }}>
            {mySetting.appName}
          </Text>
        </View>

      </View>

      {/* Slide Menu */}
      {menuOpen && (
        <Animated.View
          style={[
            style.navMenu,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
{/* Side Manue*/}
        </Animated.View>
      )}
    </>
  );
}

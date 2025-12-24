import React, {
  useState,
  useRef,
  useEffect
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
} from "react-native";
import {
  Feather
} from "@expo/vector-icons";
import {
  useRouter
} from "expo-router";
import style from "@/app/style/style";
import mySetting from "@/data/setting.json";

const {
  width
} = Dimensions.get("window");

export default function Navbar() {
  const router = useRouter();
  const [menuOpen,
    setMenuOpen] = useState(false);
  const [iconChange,
    setIconChange] = useState(false);

  // slide animation
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIconChange(!iconChange);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0: -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <View style={[style.navbar, style.sTop]}>
        <Text style={ { fontSize: 24, fontWeight: "bold", color: "#fff", marginLeft: 15 }}>
          {mySetting.appName}
        </Text>

        <TouchableOpacity onPress={toggleMenu}>
          <Feather name={iconChange ? "x": "plus"} size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Animated Side Menu */}
      <Animated.View
        style={[
          style.sidemanu,
          { transform: [{ translateX: slideAnim }] },
        ]}
        >
        <Text onPress={() => { router.back(); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="home" color="#000" size={18} /> Go Back
        </Text>

        <Text onPress={() => { router.push("/join"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="user-plus" color="#000" size={18} /> Create Profile
        </Text>

        <Text onPress={() => { Linking.openURL("https://github.com/nahidhk/PabnaBloodFind-AndroidApp"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="github" color="#000" size={18} /> Open Source GitHub
        </Text>

        <Text onPress={() => { Linking.openURL("https://pabna-blood.vercel.app/"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="chrome" color="#000" size={18} /> Official Website
        </Text>
      </Animated.View>
    </>
  );
}
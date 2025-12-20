import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import style from "@/app/style/style";
import mySetting from "@/data/setting.json";




export default function Navbar() {
  const router = useRouter();


  // Slide animation
  const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleMenu = () => {
      router.push("/join");
  };

  return (
    <>
      {/* Top Navbar */}
      <View style={[style.navbar, style.sTop]}>

          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff", marginLeft: 15 }}>
            {mySetting.appName}
          </Text>

          <TouchableOpacity onPress={toggleMenu}>
            <Feather
              name={"user-plus"}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

      </View>
    </>
  )
}

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking, Animated, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import style from "@/app/style/style";
import mySetting from "@/data/setting.json";




export default function Navbar() {
  const router = useRouter();
  const [openMenuData, setOpenMenuData] = useState(false);
  const [iconCnage, setIconChane] = useState(false);

  // Slide animation
  //const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleMenu = () => {
    setIconChane(true);
    setOpenMenuData(true);
    if(iconCnage){
        setIconChane(false);
    setOpenMenuData(false);
    }
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
            name={iconCnage ? "x" : "plus"}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>

      </View>

      {
        openMenuData ? (

          <View style={style.sidemanu}>
            <Text
              onPress={() => router.push("/join")}
              style={[style.btn, style.btnT, style.mybtn]}>
              <Feather name="user-plus" color="#000" size={18} />  Create Profile
            </Text>
            <Text
              onPress={() => Linking.openURL("https://github.com/nahidhk/PabnaBloodFind-AndroidApp")}
              style={[style.btn, style.btnT, style.mybtn]}>
              <Feather name="github" color="#000" size={18} />  Open Sorce GitHub
            </Text>
          </View>
        ) : ""
      }


    </>
  )
}

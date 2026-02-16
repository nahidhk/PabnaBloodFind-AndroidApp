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
  Share
} from "react-native";
import {
  Feather
} from "@expo/vector-icons";
import {
  useRouter,
  usePathname
} from "expo-router";
import style from "@/app/style/style";
import mySetting from "@/data/setting.json";

const {
  width
} = Dimensions.get("window");

export default function Navbar() {
  const pathname = usePathname();
  const isJoin = pathname === "/join";
  const isNewAdd = pathname == "/NewAdd"
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
      toValue: menuOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuOpen]);


  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "পাবনা ব্লাড ফাইল অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন 🔥\nhttps://pabna-blood.vercel.app/",
      });
    } catch (error) {
      console.log(error);
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
          <Feather name={iconChange ? "x" : "plus"} size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Animated Side Menu */}
      <Animated.View
        style={[
          style.sidemanu,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >

        {
          isJoin ? (
            <Text onPress={() => { router.back(); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
              <Feather name="arrow-left" color="#000" size={18} /> ফিরে যাও
            </Text>
          ) : (
            <>
              {
                isNewAdd ? (
                  <Text onPress={() => { router.back(); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
                    <Feather name="arrow-left" color="#000" size={18} /> ফিরে যাও
                  </Text>
                ) : (
                  <Text onPress={() => { router.push("/join"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
                    <Feather name="user-plus" color="#000" size={18} /> প্রোফাইল তৈরি করুন
                  </Text>
                )
              }
            </>
          )
        }

        <Text onPress={() => { Linking.openURL("https://github.com/nahidhk/PabnaBloodFind-AndroidApp"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="github" color="#000" size={18} /> ওপেন সোর্স গিটহাব
        </Text>
        <Text onPress={() => {
          handleShare();
          toggleMenu();
        }} style={[style.btn, style.btnT, style.mybtn, style.medel]}>
          <Feather name="share-2" color="#000" size={18} /> শেয়ার করুন
        </Text>
        <Text onPress={() => { Linking.openURL("https://pabna-blood.vercel.app/"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="chrome" color="#000" size={18} /> প্রধান ওয়েবসাইট
        </Text>
        <Text onPress={() => { Linking.openURL("https://www.supportkori.com/nahidhk"); toggleMenu(); }} style={[style.btn, style.btnT, style.mybtn]}>
          <Feather name="dollar-sign" color="#000" size={18} /> দয়া করে সমর্থন করুন
        </Text>
      </Animated.View >
    </>
  );
}
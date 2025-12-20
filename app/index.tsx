import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import style from "./style/style";
import Loadding from "@/components/Loadding";
import ErrJsonx from "@/components/ErrJsonx";
import serverLink from "@/components/ServerLink";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // ===============================
  // Fetch Users
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const icx = await serverLink();
        if (icx.serverLink) {
          const res = await fetch(icx.serverLink);
          const data = await res.json();
          setUsers(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // Helpers
  // ===============================
  function genderX(gender) {
    if (!gender) return "⚧ Unknown";
    if (gender.toLowerCase() === "male") return "♂️ Male";
    if (gender.toLowerCase() === "female") return "♀️ Female";
    return "⚧️ Other";
  }

  function getFirstLetter(name) {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  }

  // ===============================
  // Filtered Users
  // ===============================
  const filteredUsers = users.filter((user) => {
    const bloodMatch =
      value === "" ||
      user.bloodgroup.toUpperCase().includes(value.toUpperCase());

    const searchMatch =
      searchText === "" ||
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.address.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.includes(searchText);

    return bloodMatch && searchMatch;
  });

  // ===============================
  // Loading / Error
  // ===============================
  if (loading) return <Loadding />;
  if (error) return <ErrJsonx />;

  // ===============================
  // UI
  // ===============================
  return (
    <ScrollView
      style={{ backgroundColor: "#f9f9f9", flex: 1 }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >

      
      <View style={style.viewBoxi}>
        <View style={{ margin: 10, zIndex: 1000 }}>
          <Text style={{ marginBottom: 5, fontWeight: "bold", fontSize: 16 }}>
            <FontAwesome name="filter" size={18} color="#2825d3ff" /> Filters
          </Text>

          {/* ================= Blood select button ================= */}
          <TouchableOpacity
            style={{
              backgroundColor: "#eee",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontSize: 16 }}>
              {value ? `Selected Blood: ${value}` : "Select Blood"}
            </Text>
          </TouchableOpacity>

          {/* ================= Search input ================= */}
          <TextInput
            style={style.input}
            placeholder="খুঁজুন ➤ নাম, ঠিকানা ও ফোন নাম্বার দিয়ে"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* ================= User List ================= */}
        {filteredUsers.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
            দুঃখিত  এই গ্রুপের এখনও কোনো রক্তদাতা যুক্ত হননি। 😕
          </Text>
        ) : (
          filteredUsers.map((user, index) => (
            <View key={index} style={style.userBox}>
              {user.avater_url ? (
                <Image
                  source={{ uri: user.avater_url }}
                  style={style.profileImage}
                />
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: "#007bff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 32,
                      fontWeight: "bold",
                    }}
                  >
                    {getFirstLetter(user.name)}
                  </Text>
                </View>
              )}

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={style.userName}>
                  {user.name}{" "}
                  {user.v == 1 && (
                    <MaterialIcons
                      name="verified"
                      size={18}
                      color="#007bff"
                    />
                  )}
                </Text>

                <Text style={style.userDetail}>📞 +880{user.phone}</Text>

                <Text style={style.userDetail}>
                  🩸 Blood:{" "}
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {user.bloodgroup}
                  </Text>
                </Text>

                <Text style={style.userDetail}>📍 {user.address}</Text>
                <Text style={style.userDetail}>{genderX(user.gender)}</Text>

                <View style={style.socialRow}>
                  {user.whatsapp_number && (
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`https://wa.me/${user.whatsapp_number}`)
                      }
                    >
                      <FontAwesome
                        name="whatsapp"
                        size={27}
                        color="#25D366"
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:+880${user.phone}`)}
                    style={{ marginLeft: 10 }}
                  >
                    <FontAwesome
                      name="phone-square"
                      size={25}
                      color="#4680ff"
                    />
                  </TouchableOpacity>

                  {user.facebook && (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(user.facebook)}
                      style={{ marginLeft: 10 }}
                    >
                      <FontAwesome
                        name="telegram-square"
                        size={25}
                        color="#1877F2"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ================= Blood Modal ================= */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Blood</Text>
            {bloodGroups.map((bg, index) => (
              <TouchableOpacity
                key={index}
                style={modalStyles.modalButton}
                onPress={() => {
                  setValue(bg);
                  setModalVisible(false);
                }}
              >
                <Text style={{ fontSize: 16 }}>{bg}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[modalStyles.modalButton, { backgroundColor: "#eee" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const modalStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
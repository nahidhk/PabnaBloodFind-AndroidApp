import React, {
  useEffect,
  useState
} from "react";
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
import {
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";

import style from "./style/style";
import Loadding from "@/components/Loadding";
import ErrJsonx from "@/components/ErrJsonx";
import serverLink from "@/components/ServerLink";

export default function Home() {
  const [searchText,
    setSearchText] = useState("");
  const [users,
    setUsers] = useState([]);
  const [loading,
    setLoading] = useState(true);
  const [error,
    setError] = useState(false);

  const [bloodFilter,
    setBloodFilter] = useState("");
  const [modalVisible,
    setModalVisible] = useState(false);

  const bloodGroups = ["A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"];

  // ===============================
  // FETCH USERS ON MOUNT ONLY
  // ===============================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const icx = await serverLink();
        if (!icx?.serverLink) throw new Error("Server link not found");

        const res = await fetch(icx.serverLink);
        const data = await res.json();

        setUsers(Array.isArray(data) ? data: []);
        setError(false);
      } catch (err) {
        console.log("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  },
    []);

  // ===============================
  // HELPERS
  // ===============================
  const genderX = (gender) => {
    if (!gender) return "⚧ Unknown";
    if (gender.toLowerCase() === "male") return "♂️ Male";
    if (gender.toLowerCase() === "female") return "♀️ Female";
    return "⚧ Other";
  };

  const getFirstLetter = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  // ===============================
  // FILTER USERS
  // ===============================
  const filteredUsers = users.filter((user) => {
    const bloodMatch =
    bloodFilter === "" ||
    user.bloodgroup?.toUpperCase().includes(bloodFilter.toUpperCase());

    const searchMatch =
    searchText === "" ||
    user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone?.includes(searchText) ||
    user.address?.toLowerCase().includes(searchText.toLowerCase()); // <-- ঠিকানা দিয়ে সার্চ

    return bloodMatch && searchMatch;
  });
  // ===============================
  // LOADING / ERROR UI
  // ===============================
  if (loading) return <Loadding />;
  if (error) return <ErrJsonx />;

  // ===============================
  // MAIN UI
  // ===============================
  return (
    <ScrollView style={ { flex: 1, backgroundColor: "#f9f9f9" }} contentContainerStyle={ { paddingBottom: 50 }}>
      <View style={style.viewBoxi}>
        {/* ================= FILTER ================= */}
        <View style={ { margin: 10 }}>
          <Text style={ { fontWeight: "bold", fontSize: 16 }}>
            <FontAwesome name="filter" size={18} color="#2825d3ff" /> ফিল্টার করুন
          </Text>

          <TouchableOpacity style={style.input} onPress={() => setModalVisible(true)}>
            <Text>{bloodFilter ? `নির্বাচিত রক্ত ➤ ${bloodFilter}`: "রক্ত নির্বাচন করুন"}</Text>
          </TouchableOpacity>

          <TextInput
            style={style.input}
            placeholder="খুঁজুন ➤ নাম, ঠিকানা বা ফোন নাম্বার"
            value={searchText}
            onChangeText={setSearchText}
            />
        </View>

        {/* ================= USER LIST ================= */}
        {filteredUsers.length === 0 ? (
          <Text style={ { textAlign: "center", marginTop: 20, color: "#999" }}>
            দুঃখিত, কোনো রক্তদাতা পাওয়া যায়নি 😕
          </Text>
        ): (
          filteredUsers.map((user, index) => (
            <View key={index} style={style.userBox}>
              {user.avatar_url ? (
                <Image source={ { uri: user.avatar_url }} style={style.profileImage} />
              ): (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getFirstLetter(user.name)}</Text>
                </View>
              )}

              <View style={ { flex: 1, marginLeft: 12 }}>
                <Text style={style.userName}>
                  {user.name}{" "}
                  {user.v == 1 && <MaterialIcons name="verified" size={18} color="#007bff" />}
                </Text>

                <Text>📞 +88{user.phone}</Text>
                <Text>
                  🩸 Blood: <Text style={ { color: "red", fontWeight: "bold" }}>{user.bloodgroup}</Text>
                </Text>
                <Text>📍 {user.address}</Text>
                <Text>{genderX(user.gender)}</Text>

                <View style={style.socialRow}>
                  {user.whatsapp_number && (
                    <TouchableOpacity onPress={() =>
                      Linking.openURL(`https://wa.me/+88${user.whatsapp_number}`)}>
                      <FontAwesome name="whatsapp" size={26} color="#25D366" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={ { marginLeft: 10 }} onPress={() => Linking.openURL(`tel:+88${user.phone}`)}>
                    <FontAwesome name="phone-square" size={25} color="#4680ff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* ================= BLOOD MODAL ================= */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            <TouchableOpacity
              style={modalStyles.modalButton}
              onPress={() => {
                setBloodFilter("");
                setModalVisible(false);
              }}
              >
              <Text>All Blood</Text>
            </TouchableOpacity>

            {bloodGroups.map((bg, i) => (
              <TouchableOpacity
                key={i}
                style={modalStyles.modalButton}
                onPress={() => {
                  setBloodFilter(bg);
                  setModalVisible(false);
                }}
                >
                <Text>{bg}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "#007bff",
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
    },
  });

  const modalStyles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "#fff",
      width: "80%",
      borderRadius: 10,
      padding: 20,
    },
    modalButton: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
  });
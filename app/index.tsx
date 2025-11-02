import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import style from "./style/style";
import Loadding from "@/components/Loadding";
import ErrJsonx from "@/components/ErrJsonx";
import serverLink from "@/components/ServerLink";
import DropDownPicker from "react-native-dropdown-picker";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [icxData, setIcxData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([
    { label: "All", value: "" },
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const icx = await serverLink();
        setIcxData(icx);

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


  function genderX(gender) {
    if (!gender) return "⚧ Unknown";
    const male = "♂️ Male";
    const female = "♀️ Female";
    if (gender.toLowerCase() === "male") return male;
    if (gender.toLowerCase() === "female") return female;
    return "⚧️ Other";
  }


  function getFirstLetter(name) {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  }


  const filteredUsers = users
    .filter((user) =>
      user.bloodgroup.toUpperCase().includes(value.toUpperCase())
    )
    .filter((user) =>
      searchText === ""
        ? true
        : user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.address.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phone.includes(searchText)
    );


  if (loading) return <Loadding />;
  if (error) return <ErrJsonx />;

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

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="রক্ত"
            style={{ borderWidth: 1, borderColor: "#ccc", width: 120 }}
            dropDownContainerStyle={{
              borderWidth: 1,
              borderColor: "#ccc",
              maxHeight: "auto",
            }}
            scrollViewProps={{
              nestedScrollEnabled: true
            }}
          />

          <TextInput
            style={style.input}
            placeholder="খুঁজুন ➤ নাম, ঠিকানা ও ফোন নাম্বার দিয়ে"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />


        </View>


        {filteredUsers.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
           দুঃখিত এই গ্রুপের এখনও কোনো রক্তদাতা যুক্ত হননি। 😕
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
                    <MaterialIcons name="verified" size={18} color="#007bff" />
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
                      textTransform: "uppercase",
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
                        name="facebook-square"
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
      <Text>
        {'\n'}
      </Text>
    </ScrollView>
  );
}
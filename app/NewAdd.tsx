import {
  useLocalSearchParams,
  router
} from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {
  useState
} from "react";
import style from "./style/style";

export default function NewAdd() {

  const [loading,
    setLoading] = useState(false);

  const modalStyles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContainer: {
      backgroundColor: "#fff",
      width: "80%",
      borderRadius: 10,
      padding: 20
    },
    modalButton: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd"
    }
  });

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
  ];

  const {
    mobileNumber
  } = useLocalSearchParams();

  const [whatsapp,
    setWhatsapp] = useState("");
  const [fullName,
    setFullName] = useState("");
  const [address,
    setAddress] = useState("");
  const [bloodGroup,
    setBloodGroup] = useState("");
  const [gender,
    setGender] = useState("");

  const [bloodModal,
    setBloodModal] = useState(false);
  const [genderModal,
    setGenderModal] = useState(false);

  const handleSubmit = () => {

    if (!mobileNumber || !bloodGroup || !gender || !fullName || !address) {
      Alert.alert("ভুল হয়েছে", "অনুগ্রহ করে সব আবশ্যিক (*) তথ্য পূরণ করুন");
      return;
    }

    const profileData = {
      phone: mobileNumber,
      whatsapp_number: whatsapp || null,
      name: fullName,
      address: address,
      bloodgroup: bloodGroup,
      gender: gender
    };

    setLoading(true);

    fetch("https://api.ndsql.top/pabnaBoldFind/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profileData)
    })
    .then(res => res.json())
    .then(data => {
      setLoading(false);

      if (data.success) {
        Alert.alert(
          "সফল হয়েছে 🎉",
          "আপনার প্রোফাইল সফলভাবে তৈরি করা হয়েছে"
        );
        router.back();
      } else {
        Alert.alert(
          "সমস্যা হয়েছে",
          data.message || "এই মোবাইল নম্বর দিয়ে ইতিমধ্যে প্রোফাইল আছে"
        );
      }
    })
    .catch(() => {
      setLoading(false);
      Alert.alert(
        "সার্ভার সমস্যা",
        "সার্ভারের সাথে সংযোগ করা যায়নি, পরে আবার চেষ্টা করুন"
      );
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={ { paddingBottom: 80 }}
      >
      <View style={style.viewBox}>

        <Text style={ { fontSize: 22,
          textAlign: "center" }}>
          প্রোফাইল তথ্য
        </Text>
        <Text>(*) আবশ্যিক পূরণ করতে হবে</Text>

        {/* Mobile */}
        <View>
          <Text>মোবাইল নাম্বার*</Text>
          <TextInput
            style={style.input}
            value={mobileNumber}
            editable={false}
            />
        </View>

        {/* WhatsApp */}
        <View>
          <Text>WhatsApp নাম্বার (ঐচ্ছিক)</Text>
          <TextInput
            style={style.input}
            placeholder="e.g. 01812345678"
            keyboardType="phone-pad"
            value={whatsapp}
            onChangeText={setWhatsapp}
            />
        </View>

        {/* Blood */}
        <View>
          <Text>রক্তের গ্রুপ*</Text>
          <TouchableOpacity
            style={style.input}
            onPress={() => setBloodModal(true)}
            >
            <Text>{bloodGroup || "রক্তের গ্রুপ নির্বাচন করুন"}</Text>
          </TouchableOpacity>
        </View>

        {/* Gender */}
        <View>
          <Text>লিঙ্গ*</Text>
          <TouchableOpacity
            style={style.input}
            onPress={() => setGenderModal(true)}
            >
            <Text>{gender || "লিঙ্গ নির্বাচন করুন"}</Text>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View>
          <Text>পূর্ণ নাম*</Text>
          <TextInput
            style={style.input}
            placeholder="যেমনঃ মোঃ রনি হোসেন"
            value={fullName}
            onChangeText={setFullName}
            />
        </View>

        {/* Address */}
        <View>
          <Text>ঠিকানা (বাংলা)*</Text>
          <TextInput
            style={style.input}
            placeholder="যেমনঃ রঘুনাথপুর, আতাইকুলা, পাবনা"
            value={address}
            onChangeText={setAddress}
            />
        </View>

        <TouchableOpacity
          style={[style.btnT,
            style.btnCenter,
            style.btn]}
          onPress={handleSubmit}
          disabled={loading}
          >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ): (
            <Text style={style.btnCenter}>প্রোফাইল তৈরি করুন</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Blood Modal */}
      <Modal transparent animationType="fade" visible={bloodModal}>
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            {bloodGroups.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={modalStyles.modalButton}
                onPress={() => {
                  setBloodGroup(item);
                  setBloodModal(false);
                }}
                >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Gender Modal */}
      <Modal transparent animationType="fade" visible={genderModal}>
        <View style={modalStyles.modalBackground}>
          <View style={modalStyles.modalContainer}>
            {["Male",
              "Female",
              "Other"].map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={modalStyles.modalButton}
                  onPress={() => {
                    setGender(item);
                    setGenderModal(false);
                  }}
                  >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}
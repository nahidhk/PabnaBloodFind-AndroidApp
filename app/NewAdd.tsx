import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Button, TextInput, ScrollView, Alert } from "react-native";
import style from "./style/style";
import { useState } from "react";

export default function NewAdd() {
  const { mobileNumber } = useLocalSearchParams();

              const validateEmail = (vemail) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};




  const [email, setEmail] = useState("");
  const [verOpen, setVeriOpen] = useState(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <View style={style.viewBox}>
        <Text style={{ fontSize: 22, textAlign: "center" }}>
          Profile Info
        </Text>

        <Text style={{ textAlign: "center" }}>
          👤 আপনার প্রোফাইল ভেরিফাই করতে এবং ✅ ভেরিফাইড ব্যাজ পেতে অনুগ্রহ করে 📧
          আপনার ইমেইল ঠিকানাটি ভেরিফাই করুন। ইমেইল ভেরিফিকেশন সম্পন্ন হলে আপনার
          প্রোফাইল আরও নিরাপদ হবে এবং স্বয়ংক্রিয়ভাবে ভেরিফিকেশন প্রক্রিয়া সম্পন্ন হবে।
        </Text>

        <Text>(*) আবশ্যিক পূরণ করতে হবে।</Text>

        <View>
          <Text>Mobile Number*</Text>
          <TextInput
            placeholder="Mobile Number"
            style={style.input}
            value={mobileNumber}
          />
        </View>

        <View>
          <Text>WhatsApp Number (ইচ্ছাকৃত)</Text>
          <TextInput
            placeholder="e.g. 01812345678"
            style={style.input}
          />
        </View>

        <View>
          <Text>Full Name*</Text>
          <TextInput
            placeholder="e.g. Md. Roni Hossen"
            style={style.input}
          />
        </View>

        <View>
          <Text>Address* (Bangla)</Text>
          <TextInput
            placeholder="e.g. রঘুনাথপুর, আতাইকুলা, পাবনা"
            style={style.input}
          />
        </View>

        <View>
          <Text>Blood Group*</Text>
          <TextInput
            placeholder="AB+"
            style={style.input}
          />
        </View>

        <View>
          <Text>Email (ইচ্ছাকৃত)</Text>
          <TextInput
            placeholder="e.g. username@gmail.com"
            style={style.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text
            onPress={() => {

if (!email || !validateEmail(email)) {
  Alert.alert("Warning", "অনুগ্রহ করে সঠিক ইমেইল লিখুন");
  return;
}

              setVeriOpen(true);
            }}
          >
            ইমেইল ভেরিফাই করতে{" "}
            <Text style={{ color: "#4680ff" }}>Verify</Text>
          </Text>

          {verOpen && (
            <TextInput
              style={style.input}
              placeholder="Verify code"
              keyboardType="number-pad"
            />
          )}
        </View>

        <Button title="Add Profile" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

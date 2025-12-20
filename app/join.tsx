import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
} from "react-native";
import style from "./style/style";
import { useRouter } from "expo-router";
import ErrJsonx from "@/components/ErrJsonx";
import serverLink from "@/components/ServerLink";

export default function Join() {
    const router = useRouter();

    // স্টেট ডিফাইন
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(false);

    const [editName, setEditName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editBlood, setEditBlood] = useState("");

    // Data fetch
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const icx = await serverLink();
                if (icx?.serverLink) {
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

    if (error) {
        return <ErrJsonx />;
    }

    // ফোন নম্বর চেক
    const numberCheck = () => {
        if (
            phoneNumber.trim() === "" ||
            phoneNumber.length !== 11 ||
            !phoneNumber.startsWith("01")
        ) {
            Alert.alert(
                "ত্রুটি",
                "দয়া করে সঠিক মোবাইল নাম্বার লিখুন (১১ ডিজিট, 01 দিয়ে শুরু , +৮৮ বাদে লিখুন )"
            );
            return;
        }

        const teleNumber = phoneNumber.slice(1);
        setLoading(true);

        const filteredData = users.filter((item) =>
            String(item.phone).includes(teleNumber)
        );

        if (filteredData.length === 0) {
            // নতুন প্রোফাইল
            Alert.alert(
                "ADD PROFILE",
                `+880${teleNumber} এই নম্বর দিয়ে প্রোফাইল তৈরি নিশ্চিত`,
                [
                    { text: "বাতিল", style: "cancel" },
                    {
                        text: "নিশ্চিত",
                        onPress: () => {
                            router.push({
                                pathname: "/NewAdd",
                                params: { mobileNumber: teleNumber },
                            });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            // ইতিমধ্যে প্রোফাইল
            const user = filteredData[0];
            setCurrentUser(user);
            setEditName(user.name);
            setEditAddress(user.address);
            setEditBlood(user.blood);
            setModalVisible(true);
        }

        setLoading(false);
    };

    return (
        <View style={style.viewBox}>
            <Text style={style.textCenter}>
                {"\n\n\n"}
                <Text style={style.bigText}>Create Profile</Text>
                {"\n"}
                <Text>আমাদের সাথে যোগ দিতে আপনার ফোন নাম্বার দিয়ে ফরম পূরণ করুন</Text>
                {"\n\n\n"}
            </Text>

            <View>
                <Text>
                    আপনার মোবাইল নাম্বার লিখুন <Text style={style.cRed}>*</Text>
                </Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={style.input}
                    keyboardType="numeric"
                    placeholder="e.g 01812345678"
                    placeholderTextColor="#888"
                />

                <TouchableOpacity
                    onPress={numberCheck}
                    style={[style.btnT, style.btnCenter, style.btn]}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={style.btnCenter}>Proceed</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Already Created Modal */}
            {currentUser && (
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.5)",
                        }}
                    >
                        <View style={style.popup}>
                            <Text style={style.bigText}>Already Created</Text>
                            <Text style={style.upper}>
                                +880{phoneNumber.slice(1)} এই নাম্বার ব্যবহার করে ইতিমধ্যে প্রোফাইল তৈরি করা হয়েছে {"\n"}
                                ID: {currentUser.id} {"\n"}
                                নাম: {currentUser.name} {"\n"}
                                ঠিকানা: {currentUser.address} {"\n"}
                                রক্ত: {currentUser.bloodgroup}
                            </Text>

                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisible(false);
                                        setEditModalVisible(true);
                                    }}
                                    style={{
                                        backgroundColor: "#fff",
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ color: "#4680ff", fontWeight: "600" }}>
                                        Edit Profile
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                        backgroundColor: "#fff",
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ color: "#ff0000", fontWeight: "600" }}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Edit Profile Modal */}
            <Modal
                transparent={true}
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View style={style.popup}>
                        <Text style={style.bigText}>Edit Profile</Text>

                        <TextInput
                            value={editName}
                            onChangeText={setEditName}
                            placeholder="নাম পরিবর্তন করুন"
                            style={style.input}
                        />
                        <TextInput
                            value={editAddress}
                            onChangeText={setEditAddress}
                            placeholder="ঠিকানা পরিবর্তন করুন"
                            style={style.input}
                        />
                        <TextInput
                            value={editBlood}
                            onChangeText={setEditBlood}
                            placeholder="রক্তের গ্রুপ পরিবর্তন করুন"
                            style={style.input}
                        />

                        <View
                            style={{
                                marginTop: 10,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    Alert.alert(
                                        "Profile Updated!",
                                        `নাম: ${editName}\nঠিকানা: ${editAddress}\nরক্ত: ${editBlood}`
                                    )
                                }
                                style={{
                                    backgroundColor: "#fff",
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "#4680ff", fontWeight: "600" }}>
                                    Save
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setEditModalVisible(false)}
                                style={{
                                    backgroundColor: "#fff",
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: "#ff0000", fontWeight: "600" }}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

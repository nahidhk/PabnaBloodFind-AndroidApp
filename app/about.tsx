import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ErrJsonx from "@/components/ErrJsonx";
import Loadding from "@/components/Loadding";

export default function About() {
  const [datax, setDatax] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://icx.vercel.app/api/data/pabnaBloodFind/appAboutUs.json")
      .then((res) => res.json())
      .then((data) => {
        setDatax(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setDatax({ title: "Error", messege: "Failed to load data" });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Loadding />
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 80 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {datax.title}
      </Text>
      <Text>{datax.messege}</Text>
    </View>
  );
}

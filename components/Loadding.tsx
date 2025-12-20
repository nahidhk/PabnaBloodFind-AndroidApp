import React from "react";
import {View , Text ,ActivityIndicator} from "react-native";
import style from "@/app/style/style";

export default function Loadding() {
    return (
        <View style={[style.medel]}>
            <ActivityIndicator size="80" color="#007bff" />
            <Text>লোডিং...</Text>
        </View>
    )
}
import React from "react";
import { Text, View, Image, Linking } from "react-native"
import style from "@/app/style/style";


export default function ErrJsonx() {
    return (
        <View style={style.medel}>
            <Text style={{ textAlign: "center" }}>
                <Image
                    source={require('../assets/vector/issue.png')}
                    style={{ height: 100, width: 100, }}
                />
                {"\n"}
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: "center" }}>
                        Sorry, due to technical or network issues, the data cannot be loaded from the server.
                    </Text>

                  

                    <Text style={{ textAlign: "center" }}>
                        Call directly {" "}
                        <Text
                            onPress={() => Linking.openURL("tel:+8809638573063")}
                            style={{
                                fontWeight: 'bold',
                                color: "#4680ff",
                                textDecorationLine: 'underline' 
                            }}
                        >
                            09638573063
                        </Text>
                    </Text>


                </View>
            </Text >
        </View >
    )
}
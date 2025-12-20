import { useLocalSearchParams , router } from "expo-router";
import { View, Text, Button } from "react-native";
import style from "./style/style";

export default function NewAdd() {
  const { mobileNumber } = useLocalSearchParams(); 

  return (
    <View style={style.viewBox}>
      <Text style={{ fontSize: 18 }}>+880{mobileNumber}</Text>

      <Text>
        এটি এখনো কাজ চলমান অবস্থায় আছে। শীঘ্রই এটি সম্পূর্ণ কার্যকর করা হবে এবং পরিবর্তী আপডেট দিলে দাতার তথ্য দেখানো যাবে।
      </Text>

      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

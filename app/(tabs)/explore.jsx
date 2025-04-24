import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { UserDetailContext } from "../../context/UserDetailContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CourseCategory } from "../../constant/Option";
import { ListByCategory } from "../../components";

export default function Explore() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 15,
      }}
    >
      <ScrollView>
        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3.3) }}>
          Explore Random Courses
        </Text>
        {CourseCategory.map((item, index) => (
          <View
            key={index}
            style={{
              marginTop: 10,

              borderRadius: 10,
              backgroundColor: Colors.LIGHT_GRAY,
            }}
          >
            <ListByCategory
              uid={userDetail?.uid}
              category={item}
              enrollMode={true}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

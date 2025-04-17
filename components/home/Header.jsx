import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { UserDetailContext } from "../../context/UserDetailContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";

export const Header = () => {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            color: Colors.WHITE,
            fontWeight: "outfit-bold",
            fontSize: hp(3),
          }}
        >
          Hello, {userDetail?.name}
        </Text>
        <Text
          style={{ color: Colors.WHITE, fontFamily: "outfit", fontSize: hp(2) }}
        >
          Let's Get Started!
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Ionicons name="settings-outline" size={hp(3.5)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

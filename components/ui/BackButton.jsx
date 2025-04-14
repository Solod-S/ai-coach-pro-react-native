import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useRouter } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const BackButton = ({ style, iconSize = 4 }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => router.back()}
    >
      <Entypo name="chevron-left" size={hp(iconSize)} color={Colors.WHITE} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    borderRadius: 100,
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    borderCurve: "continuous",
  },
});

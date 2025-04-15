import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "../ui/Button";
import { useRouter } from "expo-router";

export const NoCourse = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 40, display: "flex", alignItems: "center" }}>
      <Image
        style={{ height: wp(50), width: wp(50) }}
        source={require("./../../assets/images/book.png")}
      />
      <Text
        style={{
          fontWeight: "outfit-bold",
          fontSize: hp(2.5),
          textAlign: "center",
        }}
      >
        No courses available at the moment.
      </Text>
      <Button
        text={"+ Create New Course"}
        onPress={() => router.push("addCourse")}
      />
      <Button text={" Explore Existing Courses"} type="outlined" />
    </View>
  );
};

const styles = StyleSheet.create({});

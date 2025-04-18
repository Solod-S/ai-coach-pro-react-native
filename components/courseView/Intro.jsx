import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constant/Colors";
import { BackButton, Button } from "../ui";

export const Intro = ({ course }) => {
  return (
    <View>
      <BackButton
        iconSize={3}
        style={{
          position: "absolute",
          zIndex: 12,
          top: Platform.OS == "ios" ? hp(5) : hp(3),
          right: hp(3),
        }}
      />
      <Image
        style={{ width: "100%", height: hp(40), objectFit: "cover" }}
        resizeMode="cover"
        source={imageAssets[course?.banner_image]}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
          {course?.courseTitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <AntDesign name="book" size={hp(2.5)} color="black" />
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: hp(2),
            }}
          >
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: hp(2.5),
            marginTop: 10,
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: hp(2),
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        <Button text="Start Now" onPress={() => console.log(`!`)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

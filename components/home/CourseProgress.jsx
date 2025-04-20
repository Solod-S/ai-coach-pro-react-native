import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";
import { CourseProgressCard } from "../ui";

export const CourseProgress = ({ courseList }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          color: Colors.WHITE,
          fontFamily: "outfit-bold",
          fontSize: hp(3),
        }}
      >
        Progress
      </Text>
      <FlatList
        data={courseList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

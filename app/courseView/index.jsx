import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Chapters, Intro } from "../../components";

const courseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return (
    <View
      // edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 20 }}
      >
        <Intro course={course} />
        <Chapters course={course} />
      </ScrollView>
    </View>
  );
};

export default courseView;

const styles = StyleSheet.create({});

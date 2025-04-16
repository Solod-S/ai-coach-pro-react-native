import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "../../constant/Colors";

export const Chapters = ({ course }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              padding: 18,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ gap: 10, display: "flex", flexDirection: "row" }}>
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item?.chapterName}</Text>
            </View>
            <Entypo name="controller-play" size={24} color={Colors.PRIMARY} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: hp(1.7),
  },
});

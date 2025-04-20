import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

export const CourseProgressCard = ({ item, width = wp(70) }) => {
  const getCompletedChapters = course => {
    const completedChapter = course?.completedChapter?.length;
    const perc = completedChapter / course?.chapters?.length;
    return perc;
  };
  return (
    <View
      style={{
        margin: 7,
        padding: 16,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        width,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Image
          style={{
            width: wp(20),
            height: wp(20),
            borderRadius: 8,
            objectFit: "cover",
          }}
          resizeMode="cover"
          source={imageAssets[item?.banner_image]}
        />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "outfit-bold",
              fontSize: hp(1.8),
              flexWrap: "wrap",
            }}
          >
            {item?.courseTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "outfit",
              fontSize: hp(1.5),
            }}
          >
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Progress.Bar
          progress={getCompletedChapters(item)}
          width={width - 30}
        />
        <Text style={{ marginTop: 2, fontFamily: "outfit" }} numberOfLines={1}>
          {item?.completedChapter?.length ?? 0} Out {item?.chapters?.length}{" "}
          Chapter Completed
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

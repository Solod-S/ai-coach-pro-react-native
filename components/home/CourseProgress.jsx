import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

export const CourseProgress = ({ courseList }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>
        Progress
      </Text>
      <FlatList
        data={courseList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View
            style={{
              margin: 7,
              padding: 16,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: wp(70),
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
              <Progress.Bar progress={0.3} width={wp(60)} />
              <Text
                style={{ marginTop: 2, fontFamily: "outfit" }}
                numberOfLines={1}
              >
                3 Out 5 Chapter Completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

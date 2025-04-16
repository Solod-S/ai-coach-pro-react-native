import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PracticeOption } from "../../constant/Option";
import Colors from "../../constant/Colors";

export const PracticeSection = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>
        PracticeSection
      </Text>
      <View>
        <FlatList
          scrollEnabled={false}
          data={PracticeOption}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 5, aspectRatio: 1 }} key={index}>
              <Image
                source={item?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 15,
                  objectFit: "cover",
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  padding: 15,
                  fontFamily: "outfit",
                  color: Colors.WHITE,
                  fontSize: hp(1.5),
                }}
              >
                {item?.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

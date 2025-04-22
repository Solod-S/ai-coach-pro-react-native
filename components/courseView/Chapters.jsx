import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Entypo from "@expo/vector-icons/Entypo";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export const Chapters = ({ course }) => {
  const router = useRouter();

  const isChapterCompleted = chapterIndex => {
    const isCompleted = course?.completedChapter?.find(
      item => item == chapterIndex
    );
    return isCompleted ? true : false;
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "chapterView",
                params: {
                  chapterIndex: index,
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                },
              })
            }
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
              <Text style={styles.chapterText}>
                {item?.chapterName?.length >= 35
                  ? item?.chapterName?.slice(0, 32) + "..."
                  : item?.chapterName}
              </Text>
            </View>
            {isChapterCompleted(index) ? (
              <Entypo name="check" size={hp(2.4)} color={Colors.PRIMARY} />
            ) : (
              <Entypo
                name="controller-play"
                size={hp(2.4)}
                color={Colors.PRIMARY}
              />
            )}
          </TouchableOpacity>
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

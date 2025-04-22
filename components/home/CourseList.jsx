import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export const CourseList = ({
  courseList,
  enroll = false,
  heading = "Courses",
}) => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>
        {heading}
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={courseList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/courseView/" + item?.docId,
                params: { enroll, courseParams: JSON.stringify(item) },
              })
            }
            style={styles.courseContainer}
            key={index}
          >
            <Text
              style={{
                position: "absolute",
                zIndex: item?.isEnrolled ? 1 : -2,
                left: hp(2),
                top: hp(2),
                fontFamily: "outfit-bold",
                color: Colors.PRIMARY,
                backgroundColor: item?.isEnrolled
                  ? Colors.WHITE
                  : "transparent",
                padding: 5,
                borderRadius: 8,
              }}
            >
              {item?.isEnrolled ? "Enrolled" : ""}
            </Text>
            <Image
              style={{
                width: "100%",
                height: hp(20),
                objectFit: "cover",
                borderRadius: 15,
              }}
              resizeMode="cover"
              source={imageAssets[item?.banner_image]}
            />
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: hp(2),
                marginTop: 10,
              }}
            >
              {item?.courseTitle}
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
                }}
              >
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    width: wp(70),
    backgroundColor: Colors.BG_GRAY,
    // alignItems: "center",
    margin: 5,
    borderRadius: 15,
  },
});

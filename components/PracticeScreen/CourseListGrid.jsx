import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

export const CourseListGrid = ({ courseList, option }) => {
  const router = useRouter();

  const handlePress = course => {
    router.push({
      pathname: option?.path,
      params: { courseParams: JSON.stringify(course) },
    });
  };

  return (
    <View>
      <FlatList
        numColumns={2}
        style={{ padding: 20, minHeight: hp(50) }}
        data={courseList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            key={index}
            style={{
              //   flex: 1,
              //   display: "flex",
              width: wp(50) - 40,
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 10,
              borderRadius: 15,
              // iOS shadow
              shadowColor: Colors.GRAY,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,

              // Android shadow
              elevation: 4,
            }}
          >
            {/* <AntDesign
              style={{ position: "absolute", top: 10, right: 10 }}
              name="checkcircle"
              size={hp(2.6)}
              color={Colors.GRAY}
            /> */}
            <Image
              source={option?.icon}
              style={{ width: "100%", height: hp(9), objectFit: "contain" }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 7,
              }}
            >
              {item?.courseTitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { PracticeOption } from "../../../constant/Option";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../constant/Colors";
import { BackButton, CourseListGrid } from "../../../components";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { UserDetailContext } from "../../../context/UserDetailContext";

const PracticeTypeHomeScreen = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const { type } = useLocalSearchParams();
  const option = PracticeOption.find(item => item.name === type);

  const getCourseList = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "courses"),
        where("uid", "==", userDetail?.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setCourseList(data);
    } catch (error) {
      console.log("error in getCourseList: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userDetail && getCourseList();
  }, []);

  if (!option) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Practice type not found</Text>
      </View>
    );
  }

  return (
    <View
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <BackButton
        iconSize={3}
        style={{
          position: "absolute",
          zIndex: 12,
          top: Platform.OS == "ios" ? hp(5) : hp(3),
          right: hp(3),
        }}
      />
      <Image source={option.image} style={{ height: hp(25), width: "100%" }} />
      <View style={{ position: "absolute", padding: hp(5) }}>
        <Text
          style={{
            fontFamily: "outlined-bold",
            fontSize: hp(2.6),
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {isLoading && (
        <ActivityIndicator
          style={{ marginTop: hp(20) }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      )}
      <CourseListGrid courseList={courseList} option={option} />
    </View>
  );
};

export default PracticeTypeHomeScreen;

const styles = StyleSheet.create({});

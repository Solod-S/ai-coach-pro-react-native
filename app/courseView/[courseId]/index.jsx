import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import Colors from "../../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Chapters, Intro } from "../../../components";
import { db } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const courseView = () => {
  const { courseParams, courseId, enroll, enrollMode } = useLocalSearchParams();
  const [course, setCourse] = useState([]);
  // const course = JSON.parse(courseParams);

  const getCourseById = async id => {
    try {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourse(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("error in getCourseById: ", error);
    }
  };

  useEffect(() => {
    if (!courseParams) {
      getCourseById(courseId);
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getCourseById(courseId);
  //   }, [])
  // );
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
        <Intro course={course} enroll={enroll} />
        {enrollMode === "false" && <Chapters course={course} />}
      </ScrollView>
    </View>
  );
};

export default courseView;

const styles = StyleSheet.create({});

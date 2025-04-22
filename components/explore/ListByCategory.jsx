import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useFocusEffect } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { CourseList } from "../home";

export const ListByCategory = ({ category, uid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const getCourseListByCategory = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "courses"),
        where("category", "==", category),
        where("enrolled", "==", false),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        const course = doc.data();
        if (course.uid !== uid) {
          data.push(course);
        }
      });

      const coursesQ = query(
        collection(db, "courses"),
        where("uid", "==", uid)
      );

      const coursesQuerySnapshot = await getDocs(coursesQ);
      const courses = [];
      coursesQuerySnapshot.forEach(doc => {
        courses.push(doc.data());
      });

      const result = data.map(item => {
        const isEnrolled = courses.find(
          course =>
            item.description === course.description &&
            item.courseTitle === course.courseTitle
        );

        if (isEnrolled) {
          return { ...item, isEnrolled: true };
        } else {
          return { ...item, isEnrolled: false };
        }
      });

      if (result?.length > 0) setCourseList(result);
    } catch (error) {
      console.log("error in getCourseListByCategory: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      category && getCourseListByCategory();
    }, [category])
  );

  return (
    <View>
      {courseList?.length > 0 && (
        <CourseList enroll={true} courseList={courseList} heading={category} />
      )}
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

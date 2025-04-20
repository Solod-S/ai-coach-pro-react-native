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
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        const course = doc.data();
        if (course.uid !== uid) {
          data.push(course);
        }
      });

      if (data.length > 0) setCourseList(data);
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
        <CourseList courseList={courseList} heading={category} />
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

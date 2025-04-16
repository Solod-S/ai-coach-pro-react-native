import React, { useContext, useEffect, useState } from "react";
import {
  CourseList,
  Header,
  NoCourse,
  PracticeSection,
  CourseProgress,
} from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./../../constant/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import { db } from "../../config/firebaseConfig";
import { FlatList, View } from "react-native";

export default function Home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);

  const getCourseList = async () => {
    try {
      const q = query(
        collection(db, "courses"),
        where("uid", "==", userDetail?.uid)
      );

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      if (data.length > 0) setCourseList(data);
    } catch (error) {
      console.log("error in getCourseList: ", error);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, padding: 15, backgroundColor: Colors.WHITE }}
    >
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Header />
            {courseList.length == 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

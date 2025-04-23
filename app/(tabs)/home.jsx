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
import { FlatList, Image, Platform, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCourseList = async () => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "courses"),
        where("uid", "==", userDetail?.uid)
      );

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      const result = data.map(item => {
        if (item?.enrolled) {
          return { ...item, isEnrolled: true };
        } else {
          return { ...item, isEnrolled: false };
        }
      });
      if (result.length > 0) setCourseList(result);
    } catch (error) {
      console.log("error in getCourseList: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userDetail && getCourseList();
    }, [userDetail])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: Platform.OS == "ios" ? hp(3) : hp(1),
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: "100%",
          // height: 700,
          // objectFit: "cover",
        }}
        source={require("./../../assets/images/wave.png")}
      />
      <FlatList
        onRefresh={() => getCourseList()}
        refreshing={isLoading}
        data={[]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
          // style={{
          //   flex: 1,
          //   backgroundColor: Colors.WHITE,
          //   paddingTop: Platform.OS == "ios" ? hp(3) : hp(1),
          // }}
          >
            <View style={{ padding: 15 }}>
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
          </View>
        }
      />
    </View>
  );
}

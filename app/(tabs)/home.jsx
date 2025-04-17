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
import { FlatList, Image, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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

      if (data.length > 0) setCourseList(data);
    } catch (error) {
      console.log("error in getCourseList: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);
  return (
    <View
      // edges={["top"]}
      style={
        {
          // flex: 1,
          // backgroundColor: Colors.WHITE
        }
      }
    >
      <FlatList
        onRefresh={() => getCourseList()}
        refreshing={isLoading}
        data={[]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
              paddingTop: 50,
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

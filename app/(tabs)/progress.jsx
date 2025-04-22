import React, { useContext, useEffect, useState } from "react";
import {
  CourseList,
  Header,
  NoCourse,
  PracticeSection,
  CourseProgress,
  CourseProgressCard,
} from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./../../constant/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import { db } from "../../config/firebaseConfig";
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect, useRouter } from "expo-router";

export default function Progress() {
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);
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

  useFocusEffect(
    React.useCallback(() => {
      userDetail && getCourseList();
    }, [userDetail])
  );
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image source={require("./../../assets/images/wave.png")} />
      <View
        style={{
          position: "absolute",
          padding: 20,
          paddingTop: Platform.OS == "ios" ? hp(5) : hp(3),
          width: "100%",
          height: hp(100),
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            fontSize: hp(3.3),
            paddingBottom: 5,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          onRefresh={() => getCourseList()}
          ListEmptyComponent={<NoCourse />}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          data={courseList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/courseView/" + item?.docId,
                  params: { courseParams: JSON.stringify(item) },
                });
              }}
              key={index}
            >
              <CourseProgressCard width={"94%"} item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

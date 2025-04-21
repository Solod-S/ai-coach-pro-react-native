import { Alert, Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { imageAssets } from "../../constant/Option";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constant/Colors";
import { BackButton, Button } from "../ui";
import { UserDetailContext } from "../../context/UserDetailContext";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useRouter } from "expo-router";

export const Intro = ({ course, enroll }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onEnrollCourse = async () => {
    try {
      setIsLoading(true);

      const q = query(
        collection(db, "courses"),
        where("uid", "==", userDetail?.uid)
      );

      const querySnapshot = await getDocs(q);
      const courses = [];
      querySnapshot.forEach(doc => {
        courses.push(doc.data());
      });

      if (userDetail?.member == false && courses?.length >= 5) {
        Alert.alert("Limit Reached", "You can add up to 5 courses only.");
        return;
      }

      const docId = Date.now().toString();
      const data = {
        ...course,
        createdAt: new Date(),
        createdBy: userDetail?.email,
        uid: userDetail?.uid,
        docId,
        enrolled: true,
      };
      data.completedChapter = [];

      await setDoc(doc(db, "courses", docId), data);

      router.replace({
        pathname: "/courseView/" + docId,
        params: { enroll: false, courseParams: JSON.stringify(data) },
      });
    } catch (error) {
      console.log(`Error in onEnrollCourse:`, error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <BackButton
        iconSize={3}
        // onPress={() => router.replace("/home")}
        style={{
          position: "absolute",
          zIndex: 12,
          top: Platform.OS == "ios" ? hp(5) : hp(3),
          right: hp(3),
        }}
      />
      <Image
        style={{ width: "100%", height: hp(40), objectFit: "cover" }}
        resizeMode="cover"
        source={imageAssets[course?.banner_image]}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
          {course?.courseTitle}
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
              fontSize: hp(2),
            }}
          >
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: hp(2.5),
            marginTop: 10,
          }}
        >
          Description:
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: hp(2),
            marginTop: 10,
            color: Colors.GRAY,
          }}
        >
          {course?.description}
        </Text>
        {enroll == "true" ? (
          <Button
            loading={isLoading}
            onPress={() => onEnrollCourse()}
            text="Enroll Now"
          />
        ) : (
          <Button text="Start Now" onPress={() => console.log(`!`)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

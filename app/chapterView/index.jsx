import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constant/Colors";
import { Button } from "../../components";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Toast from "react-native-toast-message";

const ChapterView = () => {
  const router = useRouter();
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getProgress = page => {
    const progress = page / chapters?.content?.length;
    return progress;
  };

  const onChapterComplete = async () => {
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "courses", docId), {
        completedChapter: arrayUnion(chapterIndex),
      });
      Toast.show({
        type: "success",
        position: "top",
        text2: "The chapter was completed.",
        //  text2: "",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      router.replace("(tabs)/home");
    } catch (error) {
      console.log("error in onChapterComplete: ", error);
      Toast.show({
        type: "error",
        position: "top",
        text2: error?.message || error,
        //  text2: "",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 25,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 60 }}
      >
        <View style={{ alignItems: "center" }}>
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("screen").width * 0.85}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
            {chapters?.content[currentPage]?.topic}
          </Text>
        </View>
        <Text style={{ marginTop: 7, fontFamily: "outfit", fontSize: hp(2.1) }}>
          {chapters?.content[currentPage]?.explain}
        </Text>
        {/* <Text>Code: </Text> */}
        {chapters?.content[currentPage]?.code && (
          <Text
            style={[
              styles.codeExampleText,
              { backgroundColor: Colors.BLACK, color: Colors.WHITE },
            ]}
          >
            {chapters?.content[currentPage]?.code}
          </Text>
        )}
        {/* <Text>Example: </Text> */}
        {chapters?.content[currentPage]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </ScrollView>
      <View
        style={{ position: "absolute", bottom: 20, right: 25, width: "100%" }}
      >
        {chapters?.content?.length - 1 != currentPage ? (
          <Button
            loading={isLoading}
            text="Next"
            onPress={() => setCurrentPage(prevPage => prevPage + 1)}
          />
        ) : (
          <Button
            loading={isLoading}
            text="Finished"
            onPress={() => onChapterComplete()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChapterView;

const styles = StyleSheet.create({
  codeExampleText: {
    marginTop: 15,
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: hp(1.8),
  },
});

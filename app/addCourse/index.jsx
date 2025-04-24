import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, Button, CustomKeyboardView } from "../../components/";
import { GenerateTopicsAIModel } from "../../config/aiModel";
import Prompt from "../../constant/Prompt";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";
import { isSameDay } from "../../utils/isSameDay";
import Toast from "react-native-toast-message";
import { UsePreventBack } from "../../hooks";

const AddCourse = () => {
  UsePreventBack();
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);

  const onGenerateTopic = async () => {
    try {
      if (!userInput) {
        Alert.alert("Error", "Please enter a course topic.");
        return;
      }
      setIsLoading(true);
      setSelectedTopic([]);
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

      const lastGeneratedAtIsSameDay = await isSameDay(userDetail?.uid);

      if (lastGeneratedAtIsSameDay) {
        Alert.alert(
          "Limit Reached",
          "You can generate only one article per day. Please try again tomorrow."
        );

        return;
      }

      const PROMPT = userInput + Prompt.IDEA;
      // console.log(`PROMPT`, PROMPT);
      const aiResponse = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResponse.response.text());
      // console.log(`topicIdea`, topicIdea.course_titles);

      if (topicIdea?.course_titles) {
        Toast.show({
          type: "success",
          position: "top",
          text2: "The topics were successfully generated.",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        setTopics(topicIdea?.course_titles);
      }
    } catch (error) {
      console.log("error in onGenerateTopic: ", error);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  const onTopicSelect = topic => {
    if (isLoading) return;
    const isAlreadyExist = selectedTopic.find(item => item === topic);
    if (!isAlreadyExist) {
      setSelectedTopic(prev => [...prev, topic]);
    } else {
      const filterTopic = selectedTopic.filter(item => item !== topic);
      setSelectedTopic(filterTopic);
      // setTopics(prev => [...prev, topic]);
    }
  };

  const onGenerateCourse = async () => {
    try {
      setIsLoading(true);

      const PROMPT = selectedTopic.join(",") + Prompt.COURSE;
      const aiResponse = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const rest = JSON.parse(aiResponse.response.text());
      const courses = rest?.courses;

      for (const item of courses || []) {
        const docId = Date.now().toString();
        await setDoc(doc(db, "courses", docId), {
          ...item,
          createdAt: new Date(),
          createdBy: userDetail?.email,
          uid: userDetail?.uid,
          enrolled: false,
          completedChapter: [],
          completedQuiz: false,
          completedFlashCard: false,
          completedQA: false,
          docId,
        });
      }
      const userRef = doc(db, "users", userDetail?.uid);
      await updateDoc(userRef, {
        lastGeneratedAt: Timestamp.now(),
      });
      setTimeout(() => {
        Toast.show({
          type: "success",
          position: "top",
          text2: "The corse was successfully generated.",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
      }, 500);
      router.push("(tabs)/home");
    } catch (error) {
      console.log("error in onGenerateCourse: ", error);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingBottom: hp(4),
      }}
    >
      <ScrollView style={{ padding: 20 }}>
        <BackButton loading={isLoading} />
        <CustomKeyboardView>
          <Text style={{ fontSize: hp(3.3), fontFamily: "outfit-bold" }}>
            Start a New Course
          </Text>
          <Text style={{ fontSize: hp(2.5), fontFamily: "outfit" }}>
            What do you want to explore today?
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: Colors.GRAY,
              fontSize: hp(1.7),
              fontFamily: "outfit",
            }}
          >
            Enter a course idea you'd like to create (e.g. Mastering Python,
            Digital Marketing Basics)
          </Text>
          <TextInput
            editable={!isLoading}
            style={styles.textInput}
            numberOfLines={3}
            multiline={true}
            placeholderTextColor={Colors.GRAY}
            onChangeText={text => {
              setUserInput(text);
            }}
            // value={userInput}
            placeholder="E.g. Mastering Python, High School Chemistry..."
          />
          <Button
            text="Generate Ideas"
            type="outline"
            loading={isLoading}
            onPress={() => onGenerateTopic()}
          />
          <View style={{ marginTop: 15, marginBottom: 10 }}>
            <Text style={{ fontSize: hp(2.3), fontFamily: "outfit-bold" }}>
              Select all topics which you want to add
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 6,
              }}
            >
              {topics?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onTopicSelect(item)}
                >
                  <Text
                    style={{
                      padding: 7,
                      borderWidth: 0.4,
                      borderRadius: 99,
                      backgroundColor: selectedTopic.includes(item)
                        ? Colors.PRIMARY
                        : Colors.WHITE,
                      color: selectedTopic.includes(item)
                        ? Colors.WHITE
                        : Colors.PRIMARY,
                      opacity: 0.7,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </CustomKeyboardView>
        {selectedTopic.length > 0 && (
          <Button
            text="Generate Course"
            onPress={() => onGenerateCourse()}
            loading={isLoading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  textInput: {
    height: hp(12),
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "flex-start",
    fontSize: hp(1.8),
    textAlignVertical: "top",
  },
});

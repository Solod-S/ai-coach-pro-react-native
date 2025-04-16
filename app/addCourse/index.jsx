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
import { Button, CustomKeyboardView } from "../../components/";
import { GenerateTopicsAIModel } from "../../config/aiModel";
import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";

const AddCourse = () => {
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

      const PROMPT = userInput + Prompt.IDEA;
      // console.log(`PROMPT`, PROMPT);
      const aiResponse = await GenerateTopicsAIModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResponse.response.text());
      // console.log(`topicIdea`, topicIdea.course_titles);

      if (topicIdea?.course_titles) setTopics(topicIdea?.course_titles);
    } catch (error) {
      console.log("error in onGenerateTopic: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  };

  const onTopicSelect = topic => {
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
      console.log(`courses`, courses);
      for (const item of courses || []) {
        await setDoc(doc(db, "courses", Date.now().toString()), {
          ...item,
          createdAt: new Date(),
          createdBy: userDetail?.email,
          uid: userDetail?.uid,
        });
      }
      router.push("(tabs)/home");
    } catch (error) {
      console.log("error in onGenerateCourse: ", error);
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
            style={styles.textInput}
            numberOfLines={3}
            multiline={true}
            placeholderTextColor={Colors.GRAY}
            onChangeText={text => setUserInput(text)}
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

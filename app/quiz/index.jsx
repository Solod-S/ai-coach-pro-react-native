import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BackButton, Button } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

const Quiz = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const quiz = course?.quiz;
  // console.log(course);

  const getProgress = currentPage => {
    const perc = currentPage / quiz?.length;
    return perc;
  };

  const onOptionSelect = selectedChoice => {
    setResult(prev => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns,
      },
    }));
  };

  const onQuizFinish = async () => {
    try {
      setIsLoading(true);
      const quizResult = {
        ...result,
        // courseId: course?.docId,
        // courseName: course?.courseTitle,
        // uid: auth?.currentUser?.uid,
      };
      await updateDoc(doc(db, "courses", course?.docId), {
        quizResult: quizResult,
      });
      router.replace({
        pathname: "/quiz/summary",
        params: { quizResultParams: JSON.stringify(quizResult) },
      });
    } catch (error) {
      console.log("Error onQuizFinish: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View>
        <Image source={require("./../../assets/images/wave.png")} />
      </View>
      <View
        style={{
          position: "absolute",
          padding: 25,
          paddingTop: Platform.OS == "ios" ? hp(5) : hp(3),
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: hp(2.6),
              color: Colors.WHITE,
              color: "#FFB800",
            }}
          >
            {currentPage + 1} of {quiz?.length}
          </Text>
          <BackButton
            iconColor={Colors.PRIMARY}
            style={{ backgroundColor: "#FFB800" }}
            iconSize={3.2}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            color="#FFB800"
            height={hp(1.2)}
            progress={getProgress(currentPage)}
            width={wp(85)}
          />
        </View>
        <View
          style={{
            padding: 20,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: hp(65),

            // iOS shadow
            shadowColor: Colors.GRAY,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,

            // Android shadow
            elevation: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfi-boldt",
              fontSize: hp(2.5),
              textAlign: "center",
            }}
          >
            {quiz[currentPage]?.question}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {quiz[currentPage]?.options.map((option, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedOption(index);
                  onOptionSelect(option);
                }}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  borderWidth: 0.3,
                  padding: 20,
                  borderRadius: 15,
                  backgroundColor:
                    selectedOption === index ? Colors.PRIMARY : Colors.WHITE,
                  // iOS shadow
                  shadowColor: Colors.GRAY,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,

                  // Android shadow
                  elevation: 4,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: hp(2),
                    color:
                      selectedOption === index ? Colors.WHITE : Colors.GRAY,
                  }}
                >
                  {option}
                </Text>
                {/* <Image
                source={require("./../../assets/images/checkbox.png")}
                style={{ width: hp(3), height: hp(3) }}
              /> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {selectedOption !== null && quiz?.length - 1 > currentPage && (
          <Button
            onPress={() => {
              setCurrentPage(prev => prev + 1);
              setSelectedOption(null);
            }}
            text={"Next"}
          />
        )}
        {selectedOption !== null && quiz?.length - 1 === currentPage && (
          <Button
            loading={isLoading}
            onPress={() => onQuizFinish()}
            text={"Finish"}
          />
        )}
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({});

import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constant/Colors";
import { Button } from "../../components";
import * as Progress from "react-native-progress";

const Summary = () => {
  const router = useRouter();
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const { quizResultParams } = useLocalSearchParams();

  const quizResult = quizResultParams ? JSON.parse(quizResultParams) : [];

  const calculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns = Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect == true
      );
      const totalQuestionCount = Object.entries(quizResult)?.length;
      const correctAnswerCount = correctAns?.length;
      setTotalQuestion(totalQuestionCount);
      setCorrectAns(correctAnswerCount);
    }
  };
  const getPercMark = () => {
    const perc = (correctAns / totalQuestion) * 100;
    return perc.toFixed(0);
  };

  useEffect(() => {
    calculateResult();
  }, []);
  return (
    <View>
      <Image
        style={{ width: "100%" }}
        source={require("./../../assets/images/wave.png")}
      />
      <View
        style={{
          position: "absolute",
          padding: 25,
          paddingTop: Platform.OS == "ios" ? hp(5) : hp(3),
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-bold",
            fontSize: hp(3.5),
            color: Colors.WHITE,
          }}
        >
          Quiz Summary
        </Text>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: Colors.WHITE,
            padding: 20,
            marginTop: 50,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: hp(11), height: hp(11), marginTop: -60 }}
            source={require("./../../assets//images/trophy.png")}
          />
          <Text style={{ fontFamily: "outfit-bold", fontSize: hp(2.8) }}>
            {getPercMark() > 60 ? "Congratulation" : "Try Again"}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
              fontSize: hp(1.8),
            }}
          >
            You gave {getPercMark()} % Correct Answer
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
              width: "100%",
            }}
          >
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>❓ {totalQuestion}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>✅ {correctAns}</Text>
            </View>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>
                ❌ {totalQuestion - correctAns}
              </Text>
            </View>
          </View>
          <Button
            text="Back To Home"
            onPress={() => router.replace("/(tabs)/home")}
          />
        </View>
        <View style={{ maxHeight: hp(45), marginTop: 10 }}>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: "outfit-bold",
              fontSize: hp(2.7),
              textAlign: "center",
            }}
          >
            Summary:
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Object.entries(quizResult)}
            keyExtractor={([key]) => key}
            renderItem={({ item }) => {
              const quizItem = item[1];
              console.log("quizItem", quizItem.isCorrect);
              const isCorrect = quizItem.isCorrect
                ? Colors.GREEN
                : Colors.LIGHT_RED;
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 15,
                    padding: 10,
                    gap: 5,
                    marginBottom: 10,
                    backgroundColor: isCorrect,
                    // backgroundColor: quizItem.isCorrect
                    //   ? Colors.RED_LIGHT
                    //   : Colors.GREEN_LIGHT,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      textAlign: "center",
                      fontSize: hp(1.8),
                    }}
                  >
                    {quizItem.isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
                  </Text>
                  <Text
                    style={{ fontFamily: "outfit-bold", fontSize: hp(1.8) }}
                  >
                    ❓ {quizItem.question}
                  </Text>
                  <Text style={{ fontFamily: "outfit", fontSize: hp(1.8) }}>
                    ✅ Correct Answer: {quizItem.correctAns}
                  </Text>
                  <Text style={{ fontFamily: "outfit", fontSize: hp(1.8) }}>
                    🧠 Your Answer: {quizItem.userChoice}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  resultTextContainer: {
    padding: 15,
    // backgroundColor: Colors.WHITE,
    // iOS shadow
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,

    // Android shadow
    elevation: 1,
    borderRadius: 10,
  },
  resultText: {
    fontFamily: "outfit",
    // color: Colors.GRAY,
    fontSize: hp(2.1),
  },
});

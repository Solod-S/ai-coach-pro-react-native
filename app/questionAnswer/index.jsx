import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constant/Colors";
import { BackButton } from "../../components";

const QuestionAnswer = () => {
  const router = useRouter();
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const onQuestionSelect = selectedChoice => {
    if (selectedQuestion === selectedChoice) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(selectedChoice);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}

      <Image
        source={require("./../../assets/images/wave.png")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <BackButton
          iconColor={Colors.PRIMARY}
          style={{
            backgroundColor: "#FFB800",
            position: "absolute",
            top: Platform.OS == "ios" ? hp(5) : hp(2),
            right: Platform.OS == "ios" ? hp(5) : hp(2),
            zIndex: 1,
          }}
          iconSize={3.2}
        />
        <Text style={styles.headerTitle}>Question & Answers</Text>
        <Text style={styles.headerSubtitle}>{course?.courseTitle}</Text>

        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={qaList}
          keyExtractor={(item, index) => item?.question + index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onQuestionSelect(index)}
              style={styles.card}
            >
              <Text style={styles.questionText}>
                {index + 1}. {item?.question}
              </Text>
              {selectedQuestion === index && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>Answer: {item?.answer}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default QuestionAnswer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 25,
    paddingTop: Platform.OS === "ios" ? hp(5) : hp(3),
  },
  headerTitle: {
    fontFamily: "outfit-bold",
    fontSize: hp(2.7),
    color: Colors.WHITE,
  },
  headerSubtitle: {
    fontFamily: "outfit",
    fontSize: hp(2.2),
    color: Colors.WHITE,
    marginBottom: 10,
  },
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 20,

    // iOS shadow
    shadowColor: Colors.GRAY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  questionText: {
    fontFamily: "outfit-bold",
    fontSize: hp(2.2),
  },
  answerContainer: {
    marginTop: 10,
    borderTopWidth: 0.3,
    paddingTop: 10,
  },
  answerText: {
    fontFamily: "outfit",
    fontSize: hp(2),
    color: Colors.GRAY,
    opacity: 0.7,
  },
});

import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";
import FlipCard from "react-native-flip-card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, Button } from "../../components";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Toast from "react-native-toast-message";

export default function Flashcards() {
  const router = useRouter();
  const { courseParams, docId, index } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcards = course?.flashcards;
  const [currentPage, setCurrentPage] = useState(0);
  const width = Dimensions.get("screen").width;
  const [isLoading, setIsLoading] = useState(false);
  const onScroll = event => {
    // Получаем смещение по X
    const contentOffsetX = event?.nativeEvent?.contentOffset.x;
    // Прокручиваем по ширине карточки с учетом отступов
    const newIndex = Math.floor(contentOffsetX / (width - 70)); // Учитываем отступы на карточках
    // Проверяем, если индекс изменился, то обновляем состояние
    if (newIndex !== currentPage) {
      // console.log("Scrolled to index:", newIndex);
      setCurrentPage(newIndex);
    }
  };

  const GetProgress = currentPage => {
    const percentage = (currentPage + 1) / flashcards?.length;
    return percentage;
  };

  const onFlashCardComplete = async () => {
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "courses", docId), {
        completedFlashCard: true,
      });
      Toast.show({
        type: "success",
        position: "top",
        text2: "The flash cards was completed.",
        //  text2: "",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      // router.back();

      router.replace("/home");
    } catch (error) {
      console.log("error in onFlashCardComplete: ", error);
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
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          height: 800,
          width: "100%",
        }}
      />

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
            {currentPage + 1} of {flashcards?.length}
          </Text>
          <BackButton
            iconColor={Colors.PRIMARY}
            style={{ backgroundColor: "#FFB800" }}
            iconSize={3.2}
          />
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Progress.Bar
            progress={GetProgress(currentPage)}
            width={Dimensions.get("window").width * 0.85}
            color={"#FFB800"}
            height={10}
          />
        </View>

        <FlatList
          data={flashcards}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          // onMomentumScrollEnd={onScroll}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                height: 500,
                marginTop: 60,
              }}
            >
              <FlipCard style={styles.flipCard}>
                {/* Face Side */}
                <View style={styles.frontCard}>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 28,
                    }}
                  >
                    {item?.front}
                  </Text>
                </View>
                <View style={styles.backCard}>
                  <Text
                    style={{
                      width: Dimensions.get("screen").width - 70,
                      fontFamily: "outfit",
                      fontSize: 28,
                      padding: 20,
                      textAlign: "center",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
        {currentPage === flashcards?.length - 1 && (
          <Button
            loading={isLoading}
            onPress={() => onFlashCardComplete()}
            text={"Finish"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get("screen").width - 70,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  frontCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  backCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
    backgroundColor: Colors.PRIMARY,
  },
});

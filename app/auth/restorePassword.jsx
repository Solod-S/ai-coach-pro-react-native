import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebaseConfig";
import { Loading, BackButton, CustomKeyboardView } from "../../components";
import { UserDetailContext } from "../../context/UserDetailContext";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const RestorePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = async () => {
    if (!email?.trim()) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "Password reset email sent.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });

      router.replace("/");
    } catch (error) {
      console.error("Password reset error:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: "Something went wrong. Try again.",
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
      }}
    >
      <CustomKeyboardView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: hp(1),
            paddingHorizontal: 25,
          }}
        >
          <BackButton />
          <Image
            style={{ width: 180, height: 180 }}
            source={require("./../../assets/images/logo.png")}
          />
          <Text style={{ fontSize: hp(3.7), fontFamily: "outfit-bold" }}>
            Password Restore
          </Text>
          <TextInput
            editable={!isLoading}
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={Colors.GRAY}
            onChangeText={value => setEmail(value)}
          />
          {isLoading ? (
            <View
              style={{
                padding: 15,
                backgroundColor: Colors.PRIMARY,
                width: "100%",
                marginTop: 25,
                borderRadius: 10,
              }}
            >
              <Loading color={Colors.WHITE} size={hp(3.3)} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleRestore()}
              style={{
                padding: 15,
                backgroundColor: Colors.PRIMARY,
                width: "100%",
                marginTop: 25,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: hp(2.4),
                  color: Colors.WHITE,
                  textAlign: "center",
                }}
              >
                Restore
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

export default RestorePassword;

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
    padding: 15,
    fontSize: 18,
    borderRadius: 8,
    color: Colors.BLACK,
  },
});

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
import Colors from "./../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { auth } from "./../../config/firebaseConfig";
import { Loading, BackButton, CustomKeyboardView } from "../../components";
import { UserDetailContext } from "../../context/UserDetailContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserDetail } = useContext(UserDetailContext);
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = async () => {
    try {
      if (email?.length <= 0 && password?.length <= 0) {
        Alert.alert("Error", "Please fill all the fields");
        return;
      }
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;
      setUserDetail(user);
    } catch (e) {
      let msg = e.message || "An error occurred";
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("auth/invalid-credential"))
        msg = "Invalid email or password";
      Alert.alert(
        "Error",
        msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " ")
      );
      console.log(`Error in userLogin:`, e.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
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
            Welcome Back
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={Colors.GRAY}
            onChangeText={value => setEmail(value)}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{ ...styles.textInput, paddingRight: 40 }}
              placeholder="Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={!showPassword}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: "45%" }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
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
              onPress={() => userLogin()}
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
                Sign In
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Text style={{ fontFamily: "outfit" }}>Don't have account?</Text>
            <Pressable onPress={() => router.replace("/auth/signUp")}>
              <Text
                style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}
              >
                Create New Here
              </Text>
            </Pressable>
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
};

export default SignIn;

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

import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: hp(5),
          paddingHorizontal: 25,
        }}
      >
        <Image
          style={{ width: 180, height: 180 }}
          source={require("./../../assets/images/logo.png")}
        />
        <Text style={{ fontSize: hp(3.7), fontFamily: "outfit-bold" }}>
          Welcome Back
        </Text>
        <TextInput style={styles.textInput} placeholder="Email" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
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
            <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-bold" }}>
              Create New Here
            </Text>
          </Pressable>
        </View>
      </View>
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
  },
});

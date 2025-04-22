import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constant/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

export default function Index() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  if (userDetail === undefined)
    return (
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          // marginHorizontal: 16,
          // marginTop: 10,
        }}
      >
        <ActivityIndicator
          style={{ marginTop: hp(45) }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        // marginHorizontal: 16,
        // marginTop: 10,
      }}
    >
      <ScrollView>
        <Image
          style={{
            // borderWidth: 1,
            width: "100%",
            height: 300,
            resizeMode: "contain",
          }}
          source={require("./../assets/images/landing.png")}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            height: "100%",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: hp(4),
              fontWeight: "bold",
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit-bold",
            }}
          >
            Welcome to AI Coach Pro
          </Text>
          <Text
            style={{
              fontSize: hp(2.2),
              color: Colors.WHITE,
              marginTop: 20,
              textAlign: "center",
              fontFamily: "outfit",
            }}
          >
            Effortlessly turn your ideas into captivating educational content
            with the power of AI! 🤖🤖
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/auth/signUp")}
          >
            <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.PRIMARY,
                borderWidth: 1,
                borderColor: Colors.WHITE,
              },
            ]}
            onPress={() => router.push("/auth/signIn")}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
              Already have an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});

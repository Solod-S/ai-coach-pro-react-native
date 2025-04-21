import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { UserDetailContext } from "../../context/UserDetailContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const Profile = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();
  const logOut = async () => {
    try {
      await signOut(auth);
      setUserDetail(null);
      router.replace("/");
    } catch (error) {
      console.log(`Error in logOut:`, error);
      setUserDetail(null);
      router.replace("/");
    } finally {
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <Image
          source={require("./../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.name}>{userDetail?.name}</Text>
        <Text style={styles.email}>{userDetail?.email}</Text>

        <View style={styles.menu}>
          <MenuItem
            icon={<MaterialIcons name="add" size={20} color="#000" />}
            label="Add Course"
            router={router}
            route="addCourse"
          />
          {/* <MenuItem
            icon={<Ionicons name="book" size={20} color="#000" />}
            label="My Course"
            router={router}
          /> */}
          <MenuItem
            icon={<Feather name="bar-chart" size={20} color="#000" />}
            label="Course Progress"
            router={router}
            route="progress"
          />

          <MenuItem
            icon={
              <MaterialIcons name="travel-explore" size={22} color="#000" />
            }
            label="Explore"
            router={router}
            route="explore"
          />

          <TouchableOpacity style={styles.item} onPress={() => logOut()}>
            <MaterialIcons name="logout" size={20} color="#000" />
            <Text style={styles.itemText}>Logout</Text>
          </TouchableOpacity>
          {/* <MenuItem
            icon={<FontAwesome5 name="shield-alt" size={20} color="#000" />}
            label="My Subscription"
            router={router}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label, router, route }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={async () => {
      try {
        if (label !== "Logout") {
          router.push(route);
        }
      } catch (error) {
        console.log(`Error in MenuItem: `, error);
      }
    }}
  >
    {icon}
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: hp(3.4),
    fontFamily: "outfit-bold",
    fontWeight: "bold",
  },
  logo: {
    width: wp(50),
    height: wp(50),
    borderRadius: 20,
  },
  name: {
    fontFamily: "outfit",
    fontSize: hp(2.4),
    fontWeight: "bold",
  },
  email: {
    fontFamily: "outfit",
    fontSize: hp(1.6),
    color: "#666",
    marginBottom: 25,
  },
  menu: {
    width: "90%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  itemText: {
    marginLeft: 12,
    fontFamily: "outfit",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Profile;

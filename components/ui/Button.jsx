import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constant/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Button = ({
  loading,
  text,
  type = "fill",
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[
        styles.button,
        {
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          backgroundColor: type === "fill" ? Colors.PRIMARY : Colors.WHITE,
        },
        style,
      ]}
      onPress={onPress}
    >
      {!loading ? (
        <Text
          style={[
            styles.text,
            { color: type === "fill" ? Colors.WHITE : Colors.PRIMARY },
            textStyle,
          ]}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          color={type === "fill" ? Colors.WHITE : Colors.PRIMARY}
          size={hp(2.8)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    width: "100%",
    marginTop: 15,
    borderRadius: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: hp(2),
    fontFamily: "outfit",
    // fontWeight: "bold",
    textAlign: "center",
  },
});

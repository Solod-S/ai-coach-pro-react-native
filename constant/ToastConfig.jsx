import { BaseToast } from "react-native-toast-message";
import Colors from "./Colors";

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.WHITE,
        borderLeftColor: Colors.GREEN,
      }}
      text1Style={{ color: "black" }}
      text2Style={{ color: "black" }}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.WHITE,
        borderLeftColor: "#EF4444",
      }}
      text1Style={{ color: "black" }}
      text2Style={{ color: "black" }}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: Colors.WHITE,
        borderLeftColor: "#3B82F6",
      }}
      text1Style={{ color: "black" }}
      text2Style={{ color: "black" }}
    />
  ),
};

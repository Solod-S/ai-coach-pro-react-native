import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/constant/ToastConfig";

export default function RootLayout() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(undefined);

  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail(docSnap.data());
          router.replace("(tabs)/home");
        }
      } else {
        setUserDetail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <Toast config={toastConfig} />
    </UserDetailContext.Provider>
  );
}

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import atonik from "../assets/images/atonikName.png";
import { useNavigation } from "@react-navigation/native";
import { router, Link } from "expo-router";

export default function Panel({ isVisible, togglePanel, closePanel }) {
  const translateY = useSharedValue(300); // Posición inicial fuera de la pantalla
  const navigation = useNavigation();
  useEffect(() => {
    translateY.value = withSpring(isVisible ? 0 : 300, {
      damping: 20,
      stiffness: 100,
    }); // Mover el panel arriba o abajo con una animación más suave
  }, [isVisible]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback onPress={closePanel}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[styles.panel, animatedStyle]}>
        <TouchableWithoutFeedback onPress={closePanel}>
          <View style={styles.panelContent}>
            <View style={styles.panelHandle} />
            <Image source={atonik} style={styles.panelImage} />
            <Text style={styles.panelText}>Inicia sesión o crea tu cuenta</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/screens/Account/Login",
                })
              }
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/screens/Account/Register",
                })
              }
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonText2}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "#1f1e1e",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  panelContent: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    height: 300,
  },
  panelHandle: {
    width: "13%",
    borderRadius: 30,
    height: 7,
    marginTop: "7%",
    backgroundColor: "#353434",
  },
  panelImage: {
    marginTop: "6%",
    width: 132,
    height: 33,
  },
  panelText: {
    fontSize: 18,
    color: "#ffffff86",
    fontWeight: "200",
    marginTop: 14,
  },
  panelButton: {
    marginTop: 20,
    backgroundColor: "#694fdb",
    paddingHorizontal: "17%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  panelButton2: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    paddingHorizontal: "12%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  panelButtonText: {
    fontSize: 19,
    color: "#ffffffc0",
    fontWeight: "200",
  },
  panelButtonText2: {
    fontSize: 19,
    color: "#000000c0",
    fontWeight: "200",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});

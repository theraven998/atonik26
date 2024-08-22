import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const baseSvgWidth = 340;
const baseSvgHeight = 350;

const svgWidth =
  screenWidth < 432 ? baseSvgWidth * (screenWidth / 432) : baseSvgWidth;
const svgHeight = baseSvgHeight * (svgWidth / baseSvgWidth);

const Inicio: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          navigation.navigate("Home");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo verificar el token");
      }
    };

    checkToken();
  }, [navigation]);

  const handleIniciarSesion = () => {
    navigation.navigate("Login");
  };

  const handleRegistrarse = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/backgroundLogin.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.cajasuperior}>
          <View style={styles.divderechos}>
            <Text style={styles.derechos}>DERECHOS RESERVADOS</Text>
          </View>
          <View style={styles.divimg}>
            <Image
              style={styles.logo}
              source={require("../../../assets/images/LogoLetras.png")}
            />
          </View>
        </View>

        <View style={styles.cajainferior}>
          <View style={styles.svgContainer}>
            <Svg
              style={styles.svg}
              viewBox="0 0 300 290"
              preserveAspectRatio="xMidYMid meet"
              width={svgWidth}
              height={svgHeight}
            >
              <Path
                fill="#2D0A42"
                d="M0 20.86c0-11.045 8.954-20 20-20h260c11.046 0 20 8.955 20 20v210.97a20 20 0 0 1-14.608 19.26l-132.984 37.23a20.01 20.01 0 0 1-10.994-.06L14.398 251.201A20 20 0 0 1 0 232.001V20.861Z"
              />
            </Svg>
          </View>
          <View style={styles.cajabienvenida}>
            <Text style={styles.bienvenida}>Bienvenido</Text>
          </View>
          <View style={[styles.buttoncaja]}>
            <TouchableOpacity
              style={[styles.button, styles.buttonlog]}
              onPress={handleIniciarSesion}
            >
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonreg]}
              onPress={handleRegistrarse}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.divsince}>
        <Text style={styles.since}>Since {screenHeight}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  highlight: {
    width: "50%",
    top: 0,
    height: "100%",
    position: "absolute",
    left: 0,
  },
  divderechos: {
    top: screenWidth < 432 ? 40 : 15,
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  derechos: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  divimg: {
    top: "35%",
    width: "100%",
    height: "50%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
  },
  svgContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    maxWidth: "100%",
    aspectRatio: 300 / 290, 
  },
  cajainferior: {
    bottom: screenHeight > 750 ? "12%" : "6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "55%",
    overflow: "hidden",
  },
  cajabienvenida: {
    width: "100%",
    height: screenHeight < 750 ? "5%" : "12%",
    position: "absolute",
    top: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  bienvenida: {
    position: "absolute",
    color: "white",
    fontSize: screenWidth < 432 ? 35 : 40,
  },
  buttoncaja: {
    top: "35%",
    display: "flex",
    height: "40%",
    width: svgWidth,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    height: screenHeight < 750 ? "30%" : "25%",
    width: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonlog: {},
  buttonreg: {
    marginTop: "12%",
  },
  buttonText: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "500",
  },
  cajasuperior: {
    height: "45%",
    width: "100%",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  since: {
    position: "relative",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "italic",
    color: "white",
    fontSize: 20,
  },
  divsince: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "5%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Inicio;

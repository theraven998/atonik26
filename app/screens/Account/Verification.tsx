import React, { useState, useRef, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from 'expo-router';

interface VerificationProps {
  navigation: any;
  route: {
    params: {
      Nombre: string;
      User: string;
      Number: string;
      password: string;
      Fecha: string;
    };
  };
}

const Verification: React.FC<VerificationProps> = ({ route }) => {
  const navigation = useNavigation();
  const { Nombre, User, Number, password, Fecha } = route.params;
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleContinuar = async () => {
    const enteredCode = code.join("");
    if (enteredCode.length < 4) {
      Alert.alert("Error", "Por favor, ingresa el código completo");
      return;
    }

    if (!Fecha) {
      Alert.alert("Error", "Por favor pon tu fecha de nacimiento");
    } else {
      // Simulación de la verificación de edad
      const edad = { anios: 18 }; // Suponiendo que se obtiene la edad correctamente

      if (edad && edad.anios >= 18) {
        try {
          const response = await fetch(
            "http://192.168.20.9:5000/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: Nombre,
                username: User,
                phone: Number,
                password: password,
                birthdate: Fecha.split("T")[0],
                verificationCode: enteredCode,
              }),
            }
          );

          if (response.ok) {
            Alert.alert("Éxito", "Usuario registrado correctamente");
          } else {
            const errorData = await response.json();
            Alert.alert("Error", errorData.msg || "Error al registrar usuario");
          }
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "No se pudo conectar con el servidor");
        }
      } else {
        Alert.alert("Error", "Para registrarte tienes que ser mayor de edad");
      }
    }
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false, // Oculta el encabezado
      });
    }, [navigation]);
  
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/backgroundLogin.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.divderechos}>
          <Text style={styles.derechos}>DERECHOS RESERVADOS</Text>
        </View>
        <View style={styles.divimg}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/LogoLetras.png")}
          />
        </View>

        <View style={styles.container}>
          <Svg width={320} height={344} fill="none">
            <Path
              fill="#2D0A42"
              d="M0 20C0 8.954 8.954 0 20 0h280c11.046 0 20 8.954 20 20v249.632a20 20 0 0 1-14.195 19.139l-143.181 43.431a20.004 20.004 0 0 1-11.834-.069L13.972 288.882A20 20 0 0 1 0 269.812V20Z"
            />
          </Svg>
          <View style={styles.cajabienvenida}>
            <Text style={styles.bienvenida}>Código de verificación</Text>
          </View>
          <View style={styles.cajainputs}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                placeholder="-"
                placeholderTextColor="lightgray"
                ref={(ref) => (inputs.current[index] = ref)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleContinuar}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divsince}>
        <Text style={styles.since}>Since 2024</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  divderechos: {
    marginBottom: "5%",
    marginTop: "40%",
    bottom: "20%",
    width: "50%",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  derechos: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  since: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "italic",
    color: "white",
    fontSize: 20,
  },
  divsince: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
    width: "100%",
    height: "4%",
    position: "relative",
  },
  divimg: {
    bottom: "20%",
    marginBottom: "2%",
    width: "40%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  container: {
    bottom: "18%",
    width: 320,
    height: 344,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  button: {
    top: "60%",
    width: "65%",
    height: "15%",
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
  },
  cajabienvenida: {
    width: "100%",
    height: "10%",
    position: "absolute",
    top: "10%",
    alignItems: "center",
  },
  bienvenida: {
    position: "absolute",
    color: "white",
    fontSize: 24,
  },
  cajainputs: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    height: "15%",
    top: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginHorizontal: 5,
    color: "white",
    fontWeight: "bold",
  },
});

export default Verification;

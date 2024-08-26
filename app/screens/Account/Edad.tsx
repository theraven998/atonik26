import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Svg, { Path } from "react-native-svg";
import { useNavigation, router, useLocalSearchParams } from "expo-router";

const Edad: React.FC = () => {
  const navigation = useNavigation();
  const { Nombre, User, Number, password } = useLocalSearchParams(); // Obtener los parámetros de la búsqueda
  const [Fecha, setFecha] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [edad, setEdad] = useState<{
    anios: number;
    meses: number;
    dias: number;
  } | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Oculta el encabezado
    });
  }, [navigation]);

  useEffect(() => {
    if (!Nombre || !User || !Number || !password) {
     // Alert.alert("Error", "Datos del usuario no proporcionados");
      // Aquí deberías manejar la navegación de vuelta a la pantalla anterior o algún otro flujo adecuado
    }
  }, [Nombre, User, Number, password]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFecha(selectedDate);
      calcularTiempoVivido(selectedDate);
    }
    setShowDatePicker(false);
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const calcularTiempoVivido = (fechaNacimiento: Date) => {
    const fechaActual = new Date();
    let anios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    let dias = fechaActual.getDate() - fechaNacimiento.getDate();

    if (dias < 0) {
      meses--;
      dias += new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        0
      ).getDate();
    }

    if (meses < 0) {
      anios--;
      meses += 12;
    }

    setEdad({ anios, meses, dias });
  };

  const handleContinuar = async () => {
    if (!Fecha) {
      Alert.alert("Error", "Por favor pon tu fecha de nacimiento");
    } else {
      if (edad && edad.anios >= 18) {
        try {
          const response = await fetch("http://192.168.20.9:5000/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: Nombre,
              username: User,
              phone: Number,
              password: password,
              birthdate: Fecha.toISOString().split('T')[0],
            }),
          });

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
          <Svg
            width={320}
            height={344}
            fill="none"
          >
            <Path
              fill="#2D0A42"
              d="M0 20C0 8.954 8.954 0 20 0h280c11.046 0 20 8.954 20 20v249.632a20 20 0 0 1-14.195 19.139l-143.181 43.431a20.004 20.004 0 0 1-11.834-.069L13.972 288.882A20 20 0 0 1 0 269.812V20Z"
            />
          </Svg>
          <View style={styles.cajabienvenida}>
            <Text style={styles.bienvenida}>Edad</Text>
          </View>
          <View style={styles.cajainputs}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.inputcaja}
            >
              <Image
                source={require("../../../assets/images/calendar.png")}
                style={styles.iconuser}
              />
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu fecha de nacimiento"
                placeholderTextColor="rgba(124, 124, 124, 1)"
                value={formatDate(Fecha)}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={Fecha || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.cajainferior}>
            <View style={styles.cajacontent}>
              <View style={styles.caja}>
                <View style={styles.cajadato}>
                  <Text style={styles.dato}>{edad ? edad.anios : "-"}</Text>
                </View>
                <View style={styles.cajatipodato}>
                  <Text style={styles.tipodato}>Años</Text>
                </View>
              </View>
              <View style={styles.caja}>
                <View style={styles.cajadato}>
                  <Text style={styles.dato}>{edad ? edad.meses : "-"}</Text>
                </View>
                <View style={styles.cajatipodato}>
                  <Text style={styles.tipodato}>Meses</Text>
                </View>
              </View>
              <View style={styles.caja}>
                <View style={styles.cajadato}>
                  <Text style={styles.dato}>{edad ? edad.dias : "-"}</Text>
                </View>
                <View style={styles.cajatipodato}>
                  <Text style={styles.tipodato}>Días</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinuar}
          >
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
  cajabienvenida: {
    width: 320,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: '-3%',
  },
  bienvenida: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  cajainputs: {
    position: "absolute",
    top: "15%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputcaja: {
    borderBottomWidth: 1,
    borderRadius: 8,
    borderColor: "#FFFFFF",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  iconuser: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cajainferior: {
    position: "absolute",
    top: "36%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  cajacontent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  caja: {
    alignItems: "center",
  },
  cajadato: {

    backgroundColor: "rgba(69, 28, 102, 0.61)",
    borderRadius: 8,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dato: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  cajatipodato: {
    marginTop: 5,
  },
  tipodato: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  button: {
    bottom: "20%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "70%",
    height: "10%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Edad;

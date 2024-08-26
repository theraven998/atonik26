import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "@/app/_layout";
import { jwtDecode } from "jwt-decode";
import { useNavigation, router } from "expo-router";

const { width, height } = Dimensions.get("window");

const proportionalFontSize = (size: number) => {
  const baseWidth = 375; // Ancho base (puedes ajustarlo según tus necesidades)
  return (size * width) / baseWidth;
};

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Oculta el encabezado
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        console.log("Token:", token);
        if (token) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            console.log("Decoded Token:", decodedToken);
            setUsername(decodedToken.sub.name || decodedToken.sub.usuario);
            setProfilePhoto(decodedToken.sub.profile_photo);
          } catch (decodingError) {
            Alert.alert("Error", "No se pudo decodificar el token");
            router.push({
              pathname: "/screens/Account/Login",
            });
          }
        } else {
          Alert.alert("Error", "No se encontró el token");
          router.push({
            pathname: "/screens/Account/Login",
          });
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo obtener el token");
        router.push({
          pathname: "/screens/Account/Login",
        });
      }
    };

    fetchUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.superior}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.cajauser}>
          <Text style={styles.welcomeText}>
            {username ? username : "Cargando..."}
          </Text>
        </View>
      </View>
      <View style={styles.middle}>
        <View style={styles.cajafoto}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
          ) : (
            <Text>No hay foto de perfil</Text>
          )}
        </View>
        <View style={styles.cajainfo}>
          <View style={styles.cajaseguidores}>
            <View style={styles.seguidosinfo}>
              <View style={styles.seguidostextcaja}>
                <Text style={styles.seguidos}>SEGUIDOS</Text>
              </View>
              <View style={styles.seguidosvaluecaja}>
                <Text style={styles.value}>666</Text>
              </View>
            </View>
            <View style={styles.seguidoresinfo}>
              <View style={styles.seguidostextcaja}>
                <Text style={styles.seguidos}>SEGUIDORES</Text>
              </View>
              <View style={styles.seguidosvaluecaja}>
                <Text style={styles.value}>666</Text>
              </View>
            </View>
          </View>
          <View style={styles.cajadescripcion}>
            <Text style={styles.descripcion}>
              Soy pedro amante de las fogatas nocturnas
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cajaboton}>
            <Pressable
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Seguir</Text>
            </Pressable>
      </View>
      <View style={styles.cajainferior}>
        <View style={styles.cajaquien}>
          <Text style={styles.userinferior}>
            {username ? username : "Cargando..."}
          </Text>
          <Text style={styles.mensaje}>estara en estos eventos ...</Text>
        </View>
      </View>
      <View style={styles.cajaeventos}>
        <View style={styles.cajaeventosimagenes}>
          <Image
            source={require("../../../assets/images/po1.png")}
            style={styles.imageevents}
          />
          <Image
            source={require("../../../assets/images/po2.png")}
            style={styles.imageevents}
          />
          <Image
            source={require("../../../assets/images/po1.png")}
            style={styles.imageevents}
          />
        </View>
        <View style={styles.cajaeventosfechas}>
          <Text style={styles.whitetext}>VIERNES 24</Text>
          <Text style={styles.whitetext}>VIERNES 24</Text>
          <Text style={styles.whitetext}>VIERNES 24</Text>
        </View>
      </View>
      <View style={styles.barrainferior}>
        <Text>Barra Inferior</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 19, 19, 1)",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  superior: {
    position: "relative",
    top: 0,
    width: "100%",
    height: "15%",
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  cajauser: {
    position: "absolute",
    bottom: "5%",
  },
  welcomeText: {
    fontStyle: "italic",
    color: "white",
    fontSize: proportionalFontSize(24),
  },
  middle: {
    flexDirection: "row", // Disposición horizontal
    height: "30%",
    top: "0%",
    width: "100%",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: "15%",
  },
  cajafoto: {
    alignItems: "center",
    position: "absolute",
    width: "45%",
    height: "90%",
  },
  profilePhoto: {
    margin: 10,
    width: 150,
    height: 170,
    borderRadius: 55,
  },
  cajainfo: {
    position: "absolute",
    width: "55%",
    height: "90%",
    left: "45%",
    top: "0%",
  },
  cajaseguidores: {
    marginLeft: proportionalFontSize(5),
    top: "2%",
    width: "100%",
    height: "40%",
    flexDirection: "row",
  },
  seguidosinfo: {
    width: "40%",
    height: "60%",
    top: "10%",
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
  },
  seguidoresinfo: {
    width: "50%",
    marginLeft: "5%",
    height: "60%",
    top: "10%",
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
  },
  seguidostextcaja: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#373737",
    backgroundColor: "black",
  },
  seguidos: {
    color: "white",
    fontSize: proportionalFontSize(15),
  },
  seguidosvaluecaja: {
    alignItems: "center",
  },
  value: {
    color: "white",
    fontSize: proportionalFontSize(18),
  },
  cajadescripcion: {
    position: "absolute",
    width: "90%",
    height: "60%",
    left: "5%",
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  descripcion: {
    textAlign: "center",
    color: "white",
    fontSize: proportionalFontSize(20),
    paddingHorizontal: 10, // Añade un poco de padding horizontal para evitar que el texto toque los bordes del contenedor
    lineHeight: proportionalFontSize(24), // Aumenta la altura de línea para mejorar la legibilidad
    flexShrink: 1, // Permite que el texto se reduzca en tamaño si es necesario para ajustarse al contenedor
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "50%",
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: proportionalFontSize(16),
  },
  cajaboton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "40%",
    width: "100%",
    height: "10%",
  },
  cajainferior: {
    position: "absolute",
    width: "100%",
    height: "50%",
    top: "50%",
  },

  userinferior: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    fontSize: proportionalFontSize(16),
  },
  cajaquien: {
    marginLeft: "2%",
    alignItems: "center",
    flexDirection: "row",
  },
  mensaje: {
    color: "white",
    fontSize: proportionalFontSize(16),
  },
  cajaeventos: {
    position: "absolute",
    bottom: "30%",
    width: "100%",
    height: "17%",
  },
  cajaeventosimagenes: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  imageevents: {
    width: 100,
    height: 100,
    margin: 10,
  },
  cajaeventosfechas: {
    bottom: "0%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-around",
  },

  barrainferior: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    height: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  whitetext: {
    color: "white",
  },
});

export default Profile;

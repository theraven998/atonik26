import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');
const buttonWidth = width * 0.5;
const buttonHeight = height * 0.05;

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = useState<string>('closed');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setCurrentIcon(currentIcon === 'closed' ? 'pass' : 'closed');
  };

  const logueo = async () => {
    try {
      const response = await axios.post('http://192.168.20.21:5000/api/login', {
        usuario,
        password,
      });

      if (response && response.data) {
        Alert.alert('Loggeado');
        await AsyncStorage.setItem('access_token', response.data.access_token);
      } else {
        Alert.alert('Error', 'La respuesta no contiene datos');
      }
    } catch (error: any) {
      Alert.alert('Error en el inicio de sesión', error.response?.data.msg || 'Credenciales incorrectas');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Oculta el encabezado
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../../assets/images/backgroundLogin.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.divderechos}>
          <Text style={styles.derechos}>DERECHOS RESERVADOS</Text>
        </View>
        <View style={styles.divimg}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/LogoLetras.png')}
          />
        </View>

        <View style={styles.svgContainer}>
          <Svg width={300} height={290} fill="none">
            <Path
              fill="#2D0A42"
              d="M0 20.86c0-11.045 8.954-20 20-20h260c11.046 0 20 8.955 20 20v210.97a20 20 0 0 1-14.608 19.26l-132.984 37.23a20.01 20.01 0 0 1-10.994-.06L14.398 251.201A20 20 0 0 1 0 232.001V20.861Z"
            />
          </Svg>
          <View style={styles.cajabienvenida}>
            <Text style={styles.bienvenida}>Bienvenido</Text>
          </View>
          <View style={styles.cajainputs}>
            <View style={styles.inputcaja}>
              <TextInput
                style={[styles.input]}
                placeholder="Usuario o Numero de telefono"
                placeholderTextColor="#7C7C7C"
                value={usuario}
                onChangeText={setUsuario}
              />
            </View>
            <View style={styles.inputcaja}>
              <TextInput
                style={[styles.input, styles.inputPass]}
                placeholder="Contraseña"
                placeholderTextColor="rgba(124, 124, 124, 1)"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.showpassword}
                onPress={togglePasswordVisibility}
              >
                <Image 
                  source={currentIcon === 'closed' ? require('../../../assets/images/closed.png') : require('../../../assets/images/eye.png')}
                  style={styles.iconpass}
                />      
              </TouchableOpacity>
            </View>
            <View style={styles.cajaforgot}>
              <Text style={styles.contrasenaolvidada}>Olvide mi Contraseña</Text>
            </View>
          </View>
          <View style={styles.buttoncaja}>
            <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonHeight }]} onPress={logueo}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  divderechos: {
    marginBottom: '5%',
    marginTop: '40%',
    bottom: '20%',
    width: '50%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  derechos: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  divimg: {
    bottom: '20%',
    marginBottom: '2%',
    width: '40%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  svgContainer: {
    bottom: '20%',
    width: 300,
    height: 290,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cajabienvenida: {
    width: '100%',
    height: '18%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  bienvenida: {
    position: 'absolute',
    color: 'white',
    fontSize: 30,
    fontWeight: 'light',
  },
  cajainputs: {
    position: 'absolute',
    width: '90%',
    top: '20%',
    alignItems: 'flex-start',
  },
  inputcaja: {
    position: 'relative',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    flexDirection: 'row',
    marginBottom: '10%',
  },
  input: {
    color: 'white',
    fontSize: 17,
    width: '100%',
    position: 'relative',
  },
  inputPass: {},
  showpassword: {
    position: 'absolute',
    left: '90%',
    top: 0,  
    width: 30,
    height: 30,
  },
  iconpass: {
    position: 'absolute', 
    width: 30,
    height: 30,
  },
  cajaforgot: {
    bottom: '15%',
    position: 'relative', 
    width: '100%', 
  },
  contrasenaolvidada: {
    fontSize: 14,
    color: 'white',
    position: 'relative',
    fontStyle: 'italic',
  },
  buttoncaja: {
    bottom: '15%',
    height: '15%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '500',
  },
  divsince: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10%',
    width: '100%',
    height: '4%',
    position: 'relative',
  },
  since: {
    position: 'absolute',
    bottom: '2%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle: 'italic',
    color: 'white',
    fontSize: 20,
  },
});

export default Login;
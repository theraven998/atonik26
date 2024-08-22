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

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = useState<string>('closed');
  const [currentConfirmIcon, setCurrentConfirmIcon] = useState<string>('closed');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setCurrentIcon(currentIcon === 'closed' ? 'pass' : 'closed');
  };

  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
    setCurrentConfirmIcon(currentConfirmIcon === 'closed' ? 'pass' : 'closed');
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://192.168.20.21:5000/api/register', {
        nombre,
        user,
        number,
        password,
      });

      if (response && response.data) {
        console.log(response.data.message);
        Alert.alert('Registro exitoso');
        await AsyncStorage.setItem('access_token', response.data.access_token);
      } else {
        Alert.alert('Error', 'La respuesta no contiene datos');
      }
    } catch (error: any) {
      Alert.alert('Error en el registro', error.response?.data.msg || 'Error al registrar');
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
        <View style={styles.cajaRegistro}>
          <Text style={styles.registro}>Regístrate</Text>
        </View>
        <View style={styles.cajainputs}>
          <View style={styles.inputcaja}>
            <TextInput
              style={[styles.input]}
              placeholder="Nombre"
              placeholderTextColor="#7C7C7C"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>
          <View style={styles.inputcaja}>
            <TextInput
              style={[styles.input]}
              placeholder="Usuario"
              placeholderTextColor="#7C7C7C"
              value={user}
              onChangeText={setUser}
            />
          </View>
          <View style={styles.inputcaja}>
            <TextInput
              style={[styles.input]}
              placeholder="Número"
              placeholderTextColor="#7C7C7C"
              value={number}
              onChangeText={setNumber}
            />
          </View>
          <View style={styles.inputcaja}>
            <TextInput
              style={[styles.input]}
              placeholder="Contraseña"
              placeholderTextColor="#7C7C7C"
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
          <View style={styles.inputcaja}>
            <TextInput
              style={[styles.input]}
              placeholder="Confirmar Contraseña"
              placeholderTextColor="#7C7C7C"
              secureTextEntry={!isPasswordConfirmVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.showpassword}
              onPress={togglePasswordConfirmVisibility}
            >
              <Image 
                source={currentConfirmIcon === 'closed' ? require('../../../assets/images/closed.png') : require('../../../assets/images/eye.png')}
                style={styles.iconpass}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttoncaja}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth, height: buttonHeight }]} onPress={handleRegister}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divsince}>
        <Text style={styles.since}>Since 2024</Text>
      </View>
    </ImageBackground>
  );
}

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
  cajaRegistro: {
    width: '100%',
    height: '10%',
    position: 'absolute',
    top: '5%',
    alignItems: 'center',
  },
  registro: {
    fontStyle: 'italic',
    position: 'absolute',
    color: 'white',
    fontSize: 30,
    fontWeight: 'light',
  },
  cajainputs: {
    marginTop: '8%',
    position: 'absolute',
    width: '90%',
    top: '12%',
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

export default Register;
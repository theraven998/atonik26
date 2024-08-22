import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions , TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import atonik from "../../../assets/images/atonikName.png";
import logo from "../../../assets/images/logo.png";
import left from "../../../assets/images/left.png";
import right from "../../../assets/images/right.png";
import Panel from "../../../components/panelPushUp"
export default function Tab() {
  
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad del panel
  const togglePanel = () => {
    setIsVisible(prev => !prev);
  };

  const closePanel = () => {
    setIsVisible(false);
  };

  


  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <LinearGradient colors={['#b16ab8', '#06020f']} style={styles.container}>
      <Image style={styles.logo} source={logo} />
      
      <View style={styles.imageRow}>
        <Image style={styles.row} source={left} />
        <Image style={styles.eventImage} source={{ uri: event.image }} />
        <Image style={styles.row} source={right} />
      </View>
      <View style={styles.descriptionContainer}> 
        <Text style={styles.cardTitle}>{event.name}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>

        <View style={styles.eventDetails}>
          <View style={styles.cardText1}>
            <Text style={styles.Border1}>Lugar:</Text>
            <Text style={styles.cardText}>{event.place}</Text>
          </View>
          <View style={styles.cardText1}>
            <Text style={styles.Border1}>Fecha:</Text>
            <Text style={styles.cardText}>3 de septiembre</Text>
          </View>
          <View style={[styles.cardText1, styles.noMargin]}>
            <Text style={styles.Border}>Precio:</Text>
            <Text style={styles.cardText}>$ {event.price}</Text>
          </View>
          <View style={styles.cardText1}>
            <Text style={styles.Border}>Hora:</Text>
            <Text style={styles.cardText}>10 PM</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={togglePanel} style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Adquirir entrada</Text>
      </TouchableOpacity>

      <Panel  isVisible={isVisible} togglePanel={togglePanel} closePanel={closePanel} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#47193c",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: "12%",
  },
  imageRow: {
    flexDirection: "row",
    display: "flex",
  },
  row: {
    height: 45,
    width: 30,
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 15,
    marginRight: 15,
  },
  eventImage: {
    height: 260,
    marginTop: 30,
    width: "100%",
    borderRadius: 20,
  },
  descriptionContainer: {
    borderRadius: 0,
    alignContent: "center",
    paddingHorizontal: 10,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: "#131313",
    width: "100%",
    height: 320,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    marginTop: 20,
    elevation: 120,
  },
  eventDescription: {
    marginLeft:10,
    fontSize: 20,
    color: "white",
    textAlign: "left",
    width: "90%",
    marginTop: 10,
    fontWeight: "200",
  },
  eventDetails: {
    marginLeft: 11,
    marginTop: 20,
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 40,
    width: "90%",
    paddingTop:"8%",
    borderTopColor:  "#c4f1ff",
    borderTopWidth:1
  },
  cardText: {
    width:"100%",
    fontWeight:"100",
    fontSize:19,
    flexDirection: "column",
    color: "white",
    paddingLeft:5
  },
  cardText1: {
    width:"40%",
    flexDirection: "column",
    color: "white",
  },
  noMargin: {
    marginRight: 0,
  },
  Border: {
    width:"100%",
    color:  "#94c8f3",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 0,
    fontSize: 22,
    fontWeight: "300",
  },
  Border1: {
    width:"100%",
    color: "#94c8f3",
    paddingLeft: 5,
    marginBottom: 0,
    fontSize: 22,
    fontWeight: "300",
  },
  buyButton: {
    backgroundColor: "white",
    marginTop: "auto",
    width: "100%",
    height: 60,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
  cardTitle:{
    color:"#e783e7",
    fontSize:25,
    marginLeft:10,
    fontWeight:"400"
  },
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#161616',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius:20,
    borderTopStartRadius:20
  },
  panelContent: {
    width: Dimensions.get('window').width * 1,
    alignItems: 'center',
    height:300,
    
  },
  panelText: {
    fontSize: 18,
    color:"#ffffff86",
    fontWeight:"200", 
    marginTop:14
  },
  panelButton: {
    marginTop: 20,
    backgroundColor: '#694fdb',
    paddingHorizontal:"17%",
    paddingVertical:10,
    borderRadius: 10,
  },

  panelButton2: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    paddingHorizontal:"12%",
    paddingVertical:10,
    borderRadius: 10,
  },
  panelButtonText: {
    fontSize: 19,
    color:"#ffffffc0",
    fontWeight:"200"
    
  },
  panelButtonText2: {
    fontSize: 19,
    color:"#000000c0",
    fontWeight:"200"
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import logo from "../../assets/images/logo.png";
import TicketList from "../../components/tickets/ticketList";

export default function Tab() {
  const [activeTab, setActiveTab] = useState('entradas'); // Estado para manejar el tab activo

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.bar}>
        <Image tintColor={"#ffffffab"} style={{marginLeft:10,height:27 , width:27}} source={require("../../assets/images/searchIcon.png")} />

          <TextInput style={styles.input} placeholder="Encuentra un evento para ti" placeholderTextColor="#888" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: 'center',
   
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: "12%",
  },
  nav: {
    position:"absolute",
    marginTop:"8%",
    width: "100%",
    height: '13%',
    top:"3%"
  },
  bar: {
 
    alignItems: 'center',
    borderColor:"#a681ff",
    borderWidth:2,
    width: "75%",
    height: 50,
    borderRadius: 16,
    marginLeft: 20,
    display:"flex",
    flexDirection:"row"
  },
  input: {
   


    height:"100%",
    width:"100%",
    paddingLeft: 10,

    color: "#ffffffd3",
  },
});

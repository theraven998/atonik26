import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import logo from "../../assets/images/logo.png";
import TicketList from "../../components/ticketList";

export default function Tab() {
  const [activeTab, setActiveTab] = useState('entradas'); // Estado para manejar el tab activo

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo}/>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setActiveTab('entradas')} style={{ width: '50%' }}>
          <Text style={activeTab === 'entradas' ? styles.ticketMenuTextActive : styles.ticketMenuTextInactive}>
            Mis entradas
          </Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity onPress={() => setActiveTab('eventos')} style={{ width: '50%' }}>
          <Text style={activeTab === 'eventos' ? styles.ticketMenuTextActive : styles.ticketMenuTextInactive}>
            Mis eventos
          </Text>
        </TouchableOpacity>
      </View>


      {activeTab === 'entradas' ? (
        <TicketList/>
      ) : (
        <Text style={styles.placeholderText}>Eventos</Text>
      )}
    </View>
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
  menuContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%",
    marginBottom:"10%"
  },
  separator: {
    backgroundColor: "white",
    height: "170%",
    width: 1,
  },
  ticketMenuTextActive: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "100", // Opcional: puedes ajustar el peso de la fuente
  },
  ticketMenuTextInactive: {
    color: "#606060",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "100",
  },
  placeholderText: {
    color: "white",
    fontSize: 18,
    marginTop: "20%",
    textAlign: "center",
  },
});

import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import logo from "../../assets/images/logo.png";

import Panel from "../../components/panelPushUp"

export default function Tab() {

  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del panel
  const togglePanel = () => {
    setIsVisible(prev => !prev);
  };

  const closePanel = () => {
    setIsVisible(true);
  };

  

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo}/>

      {isVisible && (
        <Image 
          style={{ marginTop: "40%" }} 
          tintColor="#ffffff44" 
          source={require("../../assets/images/userShadow.png")} 
        />
      )}
      <Panel  isVisible={isVisible} togglePanel={togglePanel} closePanel={closePanel} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0c",
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: "12%",
  },
})

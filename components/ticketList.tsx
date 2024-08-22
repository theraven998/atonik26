import React from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';
import lines from "../assets/images/lines.png"
import po1 from '../assets/images/po1.png'
import po1G from '../assets/images/po1G.png'
import check from '../assets/images/check.png'
import noCheck from '../assets/images/noCheck.png'
export default function Ticket() {
  return (
  

   
<View>

    <LinearGradient colors={['#E9781A','#000000']} style={styles.ticketContainer}>
      <View style={styles.leftColumn}>
        <Image
          source={po1} // URL de la imagen del evento
          style={styles.eventImage}
        />
      </View>
      <View style={styles.rightColumn}>
        <View>
            
        <Text style={styles.eventInfo2}>FECHA:</Text>
        <Text style={styles.eventInfo}>6 de Junio del 2024</Text>
        
        </View>

        <View>
            
            <Text style={styles.eventInfo2}>Lugar:</Text>
            <Text style={styles.eventInfo}>Tunja,boyaca</Text>
            
            </View>

            <View>
            
            <Text style={styles.eventInfo2}>Pertenece:</Text>
            <Text style={styles.eventInfo}>@ejemplo</Text>
            
            </View>
       
      
        <Text style={styles.eventInfo1}>ESTA BOLETA ES DE UN UNICO USO AL REALIZAR UN REGISTRO SERA INVALIDADA</Text>
      </View>
      <Image style={{marginRight:"5%",height:Dimensions.get('window').height * 0.195 , width:10}} source={lines}></Image>
     <View>
     
      <QRCode
          value="valor de la ticket" // Valor del QR
          size={80} // Tamaño del QR
          color="#ffffff" // Color del QR
          backgroundColor="none" // Fondo del QR
          style={styles.qrCode}
        />
        <Image  style={{marginTop:10,width:20, height:20, alignSelf:"center"}} source={check}></Image>
        </View>
    </LinearGradient>









    <LinearGradient colors={['#ffffff','#ffffff']} style={styles.ticketContainer}>
      <View style={styles.leftColumn}>
        <Image
          source={po1G} // URL de la imagen del evento
          style={styles.eventImage}
        />
      </View>
      <View style={styles.rightColumn}>
        <View>
            
        <Text style={styles.eventInfo2G}>FECHA:</Text>
        <Text style={styles.eventInfoG}>6 de Junio del 2024</Text>
        
        </View>

        <View>
            
            <Text style={styles.eventInfo2G}>Lugar:</Text>
            <Text style={styles.eventInfoG}>Tunja,boyaca</Text>
            
            </View>

            <View>
            
            <Text style={styles.eventInfo2G}>Pertenece:</Text>
            <Text style={styles.eventInfoG}>@ejemplo</Text>
            
            </View>
       
      
        <Text style={styles.eventInfo1G}>ESTA BOLETA ES DE UN UNICO USO AL REALIZAR UN REGISTRO SERA INVALIDADA</Text>
      </View>
      <Image tintColor={"black"} style={{marginRight:"5%",height:Dimensions.get('window').height * 0.195 , width:10}} source={lines}></Image>
     <View>
     
      <QRCode
          value="valor de la ticket" // Valor del QR
          size={80} // Tamaño del QR
          color="#000000" // Color del QR
          backgroundColor="none" // Fondo del QR
          style={styles.qrCode}
        />
        <Image  style={{marginTop:10,width:20, height:20, alignSelf:"center"}} source={noCheck





        }></Image>
        </View>
    </LinearGradient>

</View>






  );
}

const styles = StyleSheet.create({
  ticketContainer: {
    marginBottom:"7%",
    flexDirection: 'row',
    backgroundColor: '#B05416', // Fondo similar al de la imagen
    borderRadius: 15,

    width: Dimensions.get('window').width * 0.95, // Ancho del ticket en relación a la pantalla
    alignSelf: 'center',
    shadowColor: '#ff2f00',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent:"center",
    alignItems:'center',
    height:Dimensions.get('window').height * 0.195, 
    paddingRight:"5%"
  },
  leftColumn: {
    flex: 2,
    paddingRight: 10,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  rightColumn: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height:'94%'
  },
  eventInfo: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
     fontWeight:"100"
  },

  eventInfo2: {
    color: 'white',
    fontSize: 12,
    marginBottom: 0,
    fontWeight:"300"
  },

  eventInfo1: {
    color: 'white',
    fontSize: 6,
    marginBottom: 0,
    textAlign:"center",
      fontWeight:"200",
      marginTop:20
  },
  qrCode: {
    paddingLeft:100,
    marginRight:"10%"
  },

  eventInfoG: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 2,
     fontWeight:"200"
  },

  eventInfo2G: {
    color: '#000000',
    fontSize: 12,
    marginBottom: 0,
    fontWeight:"300"
  },

  eventInfo1G :{
    color: '#000000',
    fontSize: 6,
    marginBottom: 0,
    textAlign:"center",
      fontWeight:"200",
      marginTop:20
  },
});

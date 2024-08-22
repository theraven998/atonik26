
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Stack } from 'expo-router/stack';
import homeIcon from "../../assets/images/home.png";
import searchIcon from "../../assets/images/search.png"
import publishIcon from "../../assets/images/publish.png"
import profileIcon from "../../assets/images/icon.png"
import ticketIcon from "../../assets/images/ticket.png"
export default function TabLayout() {

  return (
 
    
    <Tabs  screenOptions={{   tabBarStyle: { paddingBottom:7, paddingTop:10,
      backgroundColor: "#010b1c",  height: 70, 
      fontSize: 12,
    },headerShown: false,tabBarActiveTintColor: "#c494ff",tabBarInactiveTintColor: "white" }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",          tabBarIcon: ({ color, size }) => (
            <Image
              source={homeIcon}
              style={{  width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel:"Search",
          title: "Search",tabBarIcon: ({ color, size }) => (
            <Image
              source={searchIcon}
              style={{  width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "Publish",tabBarIcon: ({ color, size }) => (
            <Image
              source={publishIcon}
              style={{  width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Ticket",tabBarIcon: ({ color, size }) => (
            <Image
              source={ticketIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
        
      />
            <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",tabBarIcon: ({ color, size }) => (
            <Image
              source={profileIcon}
              style={{  width: size, height: size, tintColor: color }}
            />
          ),
        }}
        
      />
    </Tabs>  
    
  );
}
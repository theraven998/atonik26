import { Text,  View } from "react-native";
import { router,Link ,useNavigation } from "expo-router";
import Layout from './_layout'; // Ajusta la ruta si es necesario

export default function Index() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >      
     <Link href="/home">View user</Link>
     <Layout />
    </View>
  );
}

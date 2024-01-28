import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import login from "./pantallas/login";
import info from "./pantallas/info";
import brigadista from "./pantallas/brigadista";
import Logged from './pantallas/logged';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Crear StackNavigator

// Crear un StackNavigator para la pantalla de login y Home
// Navegacion entre pantallas
function LoginStack() {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen 
                name="login" 
                component={login} 
                options={{ 
                    headerShown: false,
                    gestureEnabled: false // Deshabilita los gestos de deslizamiento
                }} 
            />
            <Stack.Screen 
                name="logged" 
                component={Logged} 
                options={{ 
                    headerShown: false,
                    gestureEnabled: false, // Deshabilita los gestos de deslizamiento
                    headerLeft: () => ( // Personaliza el botón de retroceso
                        <Button
                            onPress={() => null} // No hace nada cuando se presiona
                            title="Back"
                            color="#000"
                        />
                    ),
                }} 
            />
        </Stack.Navigator>
    );
}

// Crear un Tab para las pantallas de info, brigadista y login
// Botones de abajo
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="info"
            screenOptions={() => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#2A364E',
                }
            })}
        >
            <Tab.Screen
                name="info"
                component={info}
                options={{
                    tabBarIcon: () => <MaterialCommunityIcons name="information-outline" size={40} color="#B3DFE8" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="brigadista"
                component={brigadista}
                options={{
                    tabBarIcon: () => <MaterialCommunityIcons name="account-hard-hat" size={40} color="#B3DFE8" />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="auth"
                component={LoginStack} // Usar el StackNavigator
                options={{
                    tabBarIcon: () => <MaterialCommunityIcons name="account-circle" size={40} color="#B3DFE8" />,
                    headerShown: false,
                    tabBarStyle: {display: 'none'}
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navegation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
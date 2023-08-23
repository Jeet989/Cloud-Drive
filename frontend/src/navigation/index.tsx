import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthScreen from '../screens/auth';
import HomeScreen from '../screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddFileScreen from '../screens/add';
import LogoutScreen from '../screens/logout';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Stack = createNativeStackNavigator()
const TabStack = createBottomTabNavigator()

const HomeStack = () => {
    return (
        <TabStack.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#D6EADF',
        }}>
            <TabStack.Screen name='homeScreen' component={HomeScreen} options={{
                tabBarIcon: () => <AntDesign name='home' size={28} />
            }} />
            <TabStack.Screen name='add' component={AddFileScreen} options={{
                tabBarIcon: () => <AntDesign name='pluscircleo' size={27} />
            }} />
            <TabStack.Screen name='logout' component={LogoutScreen} options={{
                tabBarIcon: () => <AntDesign name='user' size={25} />
            }} />
        </TabStack.Navigator>
    )
}

const RootNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='auth' component={AuthScreen} />
                <Stack.Screen name='home' component={HomeStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;
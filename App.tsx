import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Импортируем наши экраны из папки src/screens
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import AddScreen from './src/screens/AddScreen'
import ProfileScreen from './src/screens/ProfileScreen'

// Инициализируем навигаторы
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// 1. Создаем компонент с вкладками (нижняя панель)
function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Книги' }} />
            <Tab.Screen name="AddTab" component={AddScreen} options={{ title: 'Добавить' }} />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ title: 'Профиль' }}
            />
        </Tab.Navigator>
    )
}

// 2. Главный компонент App, который оборачивает всё приложение
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Главный экран стека — это наши вкладки */}
                <Stack.Screen
                    name="MainTabs"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                {/* Экран деталей лежит на одном уровне с вкладками, чтобы открываться поверх них */}
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: 'Детали книги' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BookProvider } from './src/context/BookContext' // Добавляем импорт
import { Ionicons } from '@expo/vector-icons'

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
        <BookProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        // Типизация для TypeScript, чтобы он знал все доступные имена иконок Ionicons
                        let iconName: keyof typeof Ionicons.glyphMap

                        // 1. Выбираем имя иконки в зависимости от названия вкладки
                        if (route.name === 'HomeTab') {
                            // Если вкладка активна, берем залитую иконку, если нет — контурную
                            iconName = focused ? 'book' : 'book-outline'
                        } else if (route.name === 'AddTab') {
                            iconName = focused ? 'add-circle' : 'add-circle-outline'
                        } else if (route.name === 'ProfileTab') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }

                        // 2. Отрисовываем саму иконку
                        // Восклицательный знак говорит TypeScript, что iconName точно не будет пустым
                        return <Ionicons name={iconName!} size={size} color={color} />
                    },
                    tabBarActiveTintColor: '#2196F3',
                    tabBarInactiveTintColor: 'black',
                })}>
                <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Книги' }} />
                <Tab.Screen name="AddTab" component={AddScreen} options={{ title: 'Добавить' }} />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileScreen}
                    options={{ title: 'Профиль' }}
                />
            </Tab.Navigator>
        </BookProvider>
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

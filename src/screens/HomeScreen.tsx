import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

// Временные данные для нашего списка
const BOOKS = [
    { id: '1', title: '1984', author: 'Джордж Оруэлл' },
    { id: '2', title: 'Мастер и Маргарита', author: 'Михаил Булгаков' },
    { id: '3', title: 'Дюна', author: 'Фрэнк Герберт' },
]

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <FlatList
                data={BOOKS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookCard}
                        // Передаем объект книги как второй параметр в navigate
                        onPress={() => navigation.navigate('Details', { book: item })}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <Text style={styles.bookAuthor}>{item.author}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    bookCard: {
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2, // Тень для Android
    },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
    bookAuthor: { fontSize: 14, color: 'gray', marginTop: 5 },
})

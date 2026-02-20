import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
// Импортируем сам контекст
import { BookContext } from '../context/BookContext'

export default function HomeScreen({ navigation }: any) {
    // Подключаемся к контексту
    const context = useContext(BookContext)

    // Страховка для TypeScript: если контекст еще не инициализировался
    if (!context) {
        return (
            <View style={styles.container}>
                <Text>Загрузка...</Text>
            </View>
        )
    }

    // Достаем актуальный список книг
    const { books } = context

    return (
        <View style={styles.container}>
            <FlatList
                data={books} // Передаем данные из глобального состояния
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookCard}
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
        elevation: 2,
    },
    bookTitle: { fontSize: 18, fontWeight: 'bold' },
    bookAuthor: { fontSize: 14, color: 'gray', marginTop: 5 },
})

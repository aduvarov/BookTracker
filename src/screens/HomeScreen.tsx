import React, { useContext } from 'react'
// Добавили импорт Alert
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { BookContext } from '../context/BookContext'

export default function HomeScreen({ navigation }: any) {
    const context = useContext(BookContext)

    if (!context) {
        return (
            <View style={styles.container}>
                <Text>Загрузка...</Text>
            </View>
        )
    }

    // Достаем не только books, но и функцию deleteBook
    const { books, deleteBook } = context

    // Функция для вызова окна подтверждения
    const confirmDelete = (id: string, title: string) => {
        Alert.alert('Удаление книги', `Вы уверены, что хотите удалить "${title}"?`, [
            { text: 'Отмена', style: 'cancel' },
            // Если нажали "Удалить", вызываем функцию из глобального хранилища
            { text: 'Удалить', style: 'destructive', onPress: () => deleteBook(id) },
        ])
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.bookCard}
                        onPress={() => navigation.navigate('Details', { book: item })}
                        // Добавляем обработчик долгого нажатия
                        onLongPress={() => confirmDelete(item.id, item.title)}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <Text style={styles.bookAuthor}>{item.author}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    // ... стили остаются без изменений
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

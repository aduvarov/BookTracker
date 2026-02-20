import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BookContext } from '../context/BookContext'

export default function ProfileScreen() {
    const context = useContext(BookContext)

    if (!context) {
        return (
            <View style={styles.container}>
                <Text>Загрузка...</Text>
            </View>
        )
    }

    const { books } = context

    // Вычисляем статистику: длину массива книг
    const totalBooks = books.length

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мой профиль</Text>

            <View style={styles.statsCard}>
                <Text style={styles.statsText}>Прочитано книг:</Text>
                <Text style={styles.statsNumber}>{totalBooks}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, marginTop: 20 },
    statsCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        width: '100%',
    },
    statsText: { fontSize: 18, color: 'gray', marginBottom: 10 },
    statsNumber: { fontSize: 48, fontWeight: 'bold', color: '#2196F3' },
})

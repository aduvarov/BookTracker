import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
// Импортируем контекст
import { BookContext } from '../context/BookContext'

export default function AddScreen({ navigation }: any) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    // Подключаемся к контексту
    const context = useContext(BookContext)

    const handleAddBook = () => {
        if (!title.trim() || !author.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля')
            return
        }

        // Вызываем функцию из контекста, передавая ей данные из формы
        if (context) {
            context.addBook(title, author)
        }

        setTitle('')
        setAuthor('')
        navigation.navigate('HomeTab')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Название книги:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Например: Властелин колец"
            />

            <Text style={styles.label}>Автор:</Text>
            <TextInput
                style={styles.input}
                value={author}
                onChangeText={setAuthor}
                placeholder="Например: Дж. Р. Р. Толкин"
            />

            <View style={styles.buttonContainer}>
                <Button title="Сохранить книгу" onPress={handleAddBook} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: { marginTop: 10 },
})

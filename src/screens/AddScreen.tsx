import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
// Импортируем контекст
import { BookContext } from '../context/BookContext'

export default function AddScreen({ navigation }: any) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    // Подключаемся к контексту
    const context = useContext(BookContext)

    const handleAddBook = async () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, введите название книги для поиска')
            return
        }

        try {
            // 1. Отправляем запрос к API Google Books 🌐
            const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + title)

            // 2. Распаковываем ответ в JSON 📦
            const data = await response.json()

            // 3. Проверяем, нашлась ли хотя бы одна книга
            if (data.items && data.items.length > 0) {
                // Берем самую первую книгу из списка результатов
                const firstBook = data.items[0].volumeInfo

                // Достаем название и первого автора (если автор не указан, ставим заглушку)
                const foundTitle = firstBook.title
                const foundAuthor = firstBook.authors ? firstBook.authors[0] : 'Неизвестный автор'

                // 4. Передаем найденные данные в наше глобальное хранилище 💾
                if (context) {
                    context.addBook(foundTitle, foundAuthor)
                }

                setTitle('')
                setAuthor('') // Очищаем на всякий случай
                navigation.navigate('HomeTab')
            } else {
                Alert.alert('Упс!', 'Мы не смогли найти такую книгу в базе Google.')
            }
        } catch (error) {
            console.error(error)
            Alert.alert('Ошибка сети', 'Не удалось подключиться к интернету.')
        }
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

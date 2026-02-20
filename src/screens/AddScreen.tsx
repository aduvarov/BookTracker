import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'

export default function AddScreen({ navigation }: any) {
    // Создаем локальное состояние для полей ввода
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleAddBook = () => {
        // Простая валидация: проверяем, что поля не пустые
        if (!title.trim() || !author.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля')
            return
        }

        // Пока просто выводим данные в консоль
        console.log('Новая книга:', { title, author })

        // Очищаем форму
        setTitle('')
        setAuthor('')

        // Программно переключаем пользователя обратно на вкладку со списком
        navigation.navigate('HomeTab')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Название книги:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle} // Автоматически обновляет состояние title при вводе
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

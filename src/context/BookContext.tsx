import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Book = {
    id: string
    title: string
    author: string
}

type BookContextType = {
    books: Book[]
    addBook: (title: string, author: string) => void
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

// Уникальный ключ, по которому мы будем искать наши данные в памяти телефона
const STORAGE_KEY = '@book_tracker_data'

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
    // Теперь начинаем с пустого массива, чтобы не перезаписать реальные данные дефолтными
    const [books, setBooks] = useState<Book[]>([])

    // 1. ЧТЕНИЕ: Загружаем книги при первом запуске приложения
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await AsyncStorage.getItem(STORAGE_KEY)
                if (storedData) {
                    setBooks(JSON.parse(storedData)) // Собираем массив из строки
                }
            } catch (error) {
                console.error('Ошибка загрузки данных:', error)
            }
        }

        loadData()
    }, []) // <-- Обрати внимание на этот пустой массив

    // 2. ЗАПИСЬ: Сохраняем книги при каждом добавлении
    const addBook = async (title: string, author: string) => {
        const newBook = { id: Math.random().toString(), title, author }
        const updatedBooks = [newBook, ...books]

        // Обновляем состояние (чтобы сразу отобразить на экране)
        setBooks(updatedBooks)

        // Записываем обновленный массив в память телефона
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks)) // Превращаем массив в строку
        } catch (error) {
            console.error('Ошибка сохранения данных:', error)
        }
    }

    return <BookContext.Provider value={{ books, addBook }}>{children}</BookContext.Provider>
}

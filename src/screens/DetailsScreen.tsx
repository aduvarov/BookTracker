import { StyleSheet, View, Text } from 'react-native'

export default function DetailsScreen({ route }) {
    const { book } = route.params
    console.log(book)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <Text style={styles.description}>
                Здесь в будущем будет подробное описание сюжета книги...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
    author: { fontSize: 18, color: 'gray', marginBottom: 20 },
    description: { fontSize: 16, lineHeight: 24 },
})

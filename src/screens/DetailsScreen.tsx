import { StyleSheet, View, Text } from 'react-native'

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Детали: Информация о книге</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

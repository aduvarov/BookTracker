import { StyleSheet, View, Text, Button } from 'react-native'

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Главная: Мои книги</Text>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Открыть детали книги"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
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

import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Header from '../Header'

const Home = () => {
    return <SafeAreaView style={styles.container}>
        <Text>Home screen</Text>
        <Header/>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {flex: 1}
})
export default Home
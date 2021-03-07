import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function UserGuest() {

    const navigation = useNavigation()

    return (
        <ScrollView 
            centerContent
            style={styles.viewBody} 
        >
            <Image source={require("../../../assets/logo.png")} resizeMode="contain" style={styles.image} />
            <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
            <Text style={styles.description}>
                Como descubririas tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, 
                vota cual te ha gustado más y comenta como ha sido tu experiencia.
            </Text>
            <Button buttonStyle={styles.button} title="Ver tu perfil" onPress={()=> navigation.navigate("login")}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30,
    },
    image: {
        width: "100%",
        height: 400,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        marginVertical:10
    },
    description: {
        textAlign: 'justify',
        marginBottom: 20,
        color: "#b05d4b"
    },
    button: {
        backgroundColor:"#f6725b"
    }
})

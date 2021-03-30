import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RegisterForm from '../../components/account/RegisterForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image  source={require("../../../assets/logo.png")} resizeMode="contain" style={styles.image}/>
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginTop: 30
    }
})

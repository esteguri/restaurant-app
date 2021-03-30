import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import LoginForm from '../../components/account/LoginForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
    
    return (
        <KeyboardAwareScrollView>
            <Image  source={require("../../../assets/logo.png")} resizeMode="contain" style={styles.image}/>
            <View style={styles.container}>
                <LoginForm/>
                <Divider style={styles.divider}/>
                <CreateAccount/>
            </View>
            
        </KeyboardAwareScrollView>
    )
}

const CreateAccount = (props) => {
    const navigation = useNavigation();
    return (
        <Text 
            style={styles.register}
            onPress={()=>navigation.navigate("register")}
        >
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.buttonRegister}>Regístrate</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40
    },
    image: {
        height: 150,
        width: "100%",
        marginTop: 20
    },
    divider: {
        margin:40,
        backgroundColor: "#f6725b",
    },
    register: {
        marginTop:15,
        marginHorizontal: 10,
        alignSelf: "center",
    },
    buttonRegister: {
        color: "#b05d4b",
        fontWeight: "bold",
    }

})

import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { loginWithEmail } from '../../utils/actions'
import Loading from '../Loading'

export default function LoginForm() {

    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const login = async () => {
        if(!validateData()){
            return
        }

        setShowLoading(true)
        const result = await loginWithEmail(formData.email, formData.password)
        setShowLoading(false)
        if(!result.statusResponse){
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("account")
    }

    const validateData = () => {
        setErrorPassword("")
        setErrorEmail("")
        let isValid = true;
        if(!formData.email || formData.email.length == 0){
            setErrorEmail("Debes ingresar una correo")
            isValid = false;
        }
        if(!formData.password || formData.password.length == 0){
            setErrorPassword("Debes ingresar una contraseña")
            isValid = false;
        }

        return isValid;
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu correo'
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu contraseña'
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
            />
            <Button title="Iniciar Sesión"
                 containerStyle={styles.buttonContainer} 
                 buttonStyle={styles.buttonStyle} 
                 onPress={()=>login()} />
            <Loading isVisible={showLoading} text="Iniciando sesión..."/>
        </View>
    )
}

const defaultFormValues = () => {
    return {email : "", password : ""}
}

const styles = StyleSheet.create({
    form: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    input: {
        width: "80%"
    },
    buttonContainer: {
        marginTop: 20,
        width: "80%",
    },
    buttonStyle: {
        backgroundColor: "#f6725b"
    },
    icon: {
        color: "#c1c1c1"
    }
})

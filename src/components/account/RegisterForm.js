import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { registerUser } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'
import Loading from '../Loading'

export default function RegisterForm() {

    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setConfirmShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [showLoading, setShowLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const register = async () => {
        if(!validateData()){
            return;
        }
        setShowLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setShowLoading(false)
        if(!result.statusResponse){
            setErrorConfirm(result.error)
            return
        }
        navigation.navigate("account")
    }

    const validateData = () => {
        setErrorConfirm("")
        setErrorPassword("")
        setErrorEmail("")
        let isValid = true;
        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido")
            isValid =false
        }
        if(size(formData.password) < 6){
            setErrorPassword("Debes ingresar una contraseña de al menor seis caracteres")
            isValid = false;
        }

        if(formData.password != formData.confirm){
            setErrorConfirm("La contraseña y la confirmación no coinciden")
        }
        return isValid;
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu email...'
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu contraseña...'
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
            <Input
                containerStyle={styles.input}
                placeholder='Confirma tu contraseña...'
                password={true}
                secureTextEntry={!showConfirmPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= "eye-outline"
                        iconStyle={styles.icon}
                        onPress={()=>setConfirmShowPassword(!showConfirmPassword)}
                    />
                }
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
            />
            <Button title="Registrarse"
                 containerStyle={styles.buttonContainer} 
                 buttonStyle={styles.buttonStyle} 
                 onPress={()=> register()} />
            <Loading isVisible={showLoading} text="Registrando cuenta..."/>
        </View>
    )
}

const defaultFormValues = () => {
    return {email : "", password : "", confirm: ""}
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30,
        flex: 1,
        alignItems: "center"
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

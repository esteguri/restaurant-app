import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({email, setShowModal, toastRef, setReloadUser}) {

    const [password, setPassword] = useState("")
    const [newEmail, setNewEmail] = useState(email)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    
    const changeName = async () => {
        if(!validateForm()){
            return;
        }

        setShowLoading(true)
        const resultReauthenticate = await reauthenticate(password);

        if(!resultReauthenticate.statusResponse){
            setErrorPassword("Contraseña incorrecta")
            setShowLoading(false)
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail);
        setShowLoading(false)
        if(!resultUpdateEmail.statusResponse){
            setErrorPassword("No se puede cambiar por este correo, ya esta en uso por otro usuario.")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se han actualizado el email", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true;
        if(!validateEmail(newEmail)){
            setErrorEmail("Debes ingresar un correo valido")
            isValid = false;
        }
        if(newEmail == email){
            setErrorEmail("Debe ingresar un correo diferente al actual")
            isValid = false;
        }

        if(isEmpty(password)){
            setErrorPassword("Debes ingresar tu contraseña")
            isValid = false;
        }
        return isValid;
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Ingresa el nuevo correo"
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                
            />
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= {showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                
            />
            <Button 
                title="Cambiar correo"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                onPress={changeName}
                loading={showLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    buttonContainer: {
        width: "95%"
    },
    button: {
        backgroundColor: "#f99484"
    }
})
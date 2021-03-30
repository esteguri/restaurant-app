import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { reauthenticate, updateEmail, updatePassword } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangePasswordForm({setShowModal, toastRef}) {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorNewPassword, setErrorNewPassword] = useState("")
    const [errorCurrentPassword, setErrorCurrentPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    
    const changeName = async () => {
        if(!validateForm()){
            return;
        }

        setShowLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword);

        if(!resultReauthenticate.statusResponse){
            setErrorCurrentPassword("Contraseña incorrecta")
            setShowLoading(false)
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword);
        setShowLoading(false)
        if(!resultUpdatePassword.statusResponse){
            setConfirmPassword("Ocurrio un error al cambiar la contraseña, intenta mas tarde")
            return
        }

        toastRef.current.show("Se ha actualizado la contraseña", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorCurrentPassword("")
        setErrorNewPassword("")
        setErrorConfirmPassword("")
        let isValid = true;

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword("Debes ingresar tu contraseña actual")
            isValid = false;
        }

        if(size(newPassword) < 6){
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres")
            isValid = false;
        }

        if(confirmPassword !== newPassword){
            setErrorConfirmPassword("La nueva contraseña y la confirmación no coinciden")
            isValid = false;
        }

        if(newPassword == currentPassword){
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual")
            isValid = false;
        }

        return isValid;
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Ingresa tu contraseña actual"
                containerStyle={styles.input}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
                password={true}
                secureTextEntry={!showCurrentPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= {showCurrentPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}
                        onPress={()=>setShowCurrentPassword(!showCurrentPassword)}
                    />
                }
                
            />
            <Input
                placeholder="Ingresa tu nueva contraseña"
                containerStyle={styles.input}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showNewPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= {showNewPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}
                        onPress={()=>setShowNewPassword(!showNewPassword)}
                    />
                }
                
            />
            <Input
                placeholder="Confirma tu nueva contraseña"
                containerStyle={styles.input}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showConfirmPassword}
                rightIcon={ 
                    <Icon 
                        type="material-community"
                        name= {showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{color:"#c2c2c2"}}
                        onPress={()=>setShowConfirmPassword(!showConfirmPassword)}
                    />
                }
                
            />
            <Button 
                title="Cambiar contraseña"
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
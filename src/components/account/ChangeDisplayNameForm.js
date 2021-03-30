import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({displayName, setShowModal, toastRef, setReloadUser}) {

    const [newDisplayName, setNewDisplayName] = useState(displayName)
    const [error, setError] = useState("")
    const [showLoading, setShowLoading] = useState(false)
    
    const changeName = async () => {
        if(!validateForm()){
            return
        }
        setShowLoading(true)
        const result = await updateProfile({displayName: newDisplayName})
        setShowLoading(false)
        if(!result.statusResponse){
            setError("Error al actualizar nombre y apellidos, intenta más tarde")
            return
        }
        setReloadUser(true)
        toastRef.current.show("Se han actualizado nombres y apellidos", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setError("")
        if(isEmpty(newDisplayName)){
            setError("Debes ingresar nombres y apellidos")
            return false;
        }
        if(newDisplayName == displayName){
            setError("Debe ingresar un nombre diferente al actual")
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Ingresa nombre y apellidos"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                
            />
            <Button 
                title="Cambiar nombres y apellidos"
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

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddRestaurantForm({toastRef, setShowLoading}) {

    const addRestaurant = () => {
        console.log("addRestaurant")
    }
    return (
        <View style={styles.container}>
            <FormAdd/>
            <Button
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.buttonAddRestaurant}
            />
        </View>
    )
}

function FormAdd() {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phoneNumber, setPhoneNumber] = useState("")

    return (
        <View style={styles.containerForm}>
            <Input
                placeholder="Nombre del restaurante"
            />
            <Input
                placeholder="Dirección del restaurante"
            />
            <Input
                placeholder="Correo del restaurante"
                keyboardType="email-address"
            />
            <View style={styles.containerPhone} >
                <CountryPicker 
                    widthFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect= {(country)=>{
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="Whatsapp del restaurante"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                />
                
            </View>
            <Input
                placeholder="Descripción del restaurante"
                multiline
                containerStyle={styles.textArea}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        height: "100%"
    },
    containerForm: {
        marginHorizontal: 10,
    },
    textArea: {
        height:100,
        width: "100%"
    },
    containerPhone: {
        width: "80%",
        flexDirection: "row",
    },
    inputPhone: {
        width: "80%"
    },
    buttonAddRestaurant: {
        margin: 20,
        backgroundColor: "#f6725b"
    }
})

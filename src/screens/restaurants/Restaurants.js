import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import Loading from '../../components/Loading'
import { isUserLogged } from '../../utils/actions'
import firebase from 'firebase/app'

export default function Restaurants({navigation}) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            user ? setUser(true) : setUser(false)
        })
    }, [])

    if(user == null){
        return <Loading isVisible={true} text="Cargando" />
    }

    return (
        <View style={styles.container}>
            <Text>Restaurants...</Text>
            {user && (
                <Icon
                    type="material-community"
                    name="plus"
                    color="#f6725b"
                    reverse
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        navigation.navigate("add-restaurant")
                    }}
                />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    buttonContainer: {
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})

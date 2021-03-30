import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast';
import { Button } from 'react-native-elements'
import AccountOption from '../../components/account/AccountOption';
import InfoUser from '../../components/account/InfoUser';
import Loading from '../../components/Loading';
import { closeSesion, getCurrentUser } from '../../utils/actions';

export default function UserLogged() {
    const navigation = useNavigation()
    const toastRef = useRef()

    const [showLoading, setShowLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, reloadUser)

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                            setLoading={setShowLoading} 
                            setLoadingText={setLoadingText} />
                    </View>
                )
            }
            {user && <AccountOption user={user} toastRef={toastRef} setReloadUser={setReloadUser}/>}
            <Button 
                buttonStyle={styles.buttonCloseSession}
                titleStyle={styles.buttonCloseSessionTitle}
                title="Cerrar sesión" 
                onPress={() => {
                    closeSesion()
                    navigation.navigate("restaurants")
                }
            }/>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={showLoading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{ 
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    buttonCloseSession: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#f6725b",
        borderBottomWidth: 1,
        borderBottomColor: "#f6725b",
        paddingVertical: 10
    },
    buttonCloseSessionTitle: {
        color: "#f6725b"
    }
})

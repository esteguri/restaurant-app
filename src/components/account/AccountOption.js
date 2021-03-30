import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOption({user, toastRef, setReloadUser}) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const menuOptions = generateOptions();

    const selectedComponent = (nameComponent) => {
        switch (nameComponent) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm 
                        displayName={user.displayName ? user.displayName : ''} 
                        setShowModal={setShowModal} 
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm 
                        email={user.email} 
                        setShowModal={setShowModal} 
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm 
                        setShowModal={setShowModal} 
                        toastRef={toastRef}
                    />
                )
                break;
        }
        setShowModal(true)
    }

    return (
        <View>
            { 
                menuOptions.map((menu) => (
                    <ListItem key={menu.name} style={styles.menuItem} onPress={()=> selectedComponent(menu.name)}>
                        <Icon type="material-community" name={menu.iconNameLeft} color={menu.iconColorLeft}/>
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon type="material-community" name={menu.iconNameRight} color={menu.iconColorRight}/>
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

const generateOptions = () => {
    return [
        {
            title: "Cambiar nombres y apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#74848c",
            iconNameRight: "chevron-right",
            iconColorRight: "#74848c",
            name: "displayName"
        },
        {
            title: "Cambiar email",
            iconNameLeft: "at",
            iconColorLeft: "#74848c",
            iconNameRight: "chevron-right",
            iconColorRight: "#74848c",
            name: "email",
        },
        {
            title: "Cambiar contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#74848c",
            iconNameRight: "chevron-right",
            iconColorRight: "#74848c",
            name: "password"
        },
        
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#74848c",
    }
})

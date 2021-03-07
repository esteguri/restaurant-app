import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import SearchStack from './SearchStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import AccountStack from './AccountStack'
import { Icon } from 'react-native-elements'

const Tab = createBottomTabNavigator()

export default function Navigation() {

    const screenOptions = (route, color)=> {
        let iconName
        switch (route.name) {
            case "restaurants":
                iconName = "compass-outline"
                break;
        
            case "favorites":
                iconName = "heart-outline"
                break;

            case "topRestaurants":
                iconName = "star-outline"
                break;

            case "search":
                iconName = "magnify"
                break;

            case "account":
                iconName = "account-circle"
                break;
        }

        return (
            <Icon 
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                tabBarOptions={{
                    inactiveTintColor:"#74848c",
                    activeTintColor:"#f6725b"
                }}
                screenOptions={({route}) => ({
                    tabBarIcon: ({color}) => screenOptions(route, color)
                })}
            >
                <Tab.Screen name="restaurants" 
                    component={RestaurantsStack} 
                    options={{title:"Restaurantes"}} />       
                <Tab.Screen name="favorites" 
                    component={FavoritesStack} 
                    options={{title:"Favoritos"}} />       
                <Tab.Screen name="search" 
                    component={SearchStack} 
                    options={{title:"Buscar"}} />       
                <Tab.Screen name="topRestaurants" 
                    component={TopRestaurantsStack} 
                    options={{title:"Top 5 Restaurantes"}} />       
                <Tab.Screen name="account" 
                    component={AccountStack} 
                    options={{title:"Cuenta"}} />       
            </Tab.Navigator>
        </NavigationContainer>
    )
}

import React from 'react'
import Restaurants from '../screens/restaurants/Restaurants';
import {createStackNavigator} from '@react-navigation/stack'
import AddRestaurant from '../screens/restaurants/AddRestaurant';

const Stack = createStackNavigator();

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="restaurants"
                component={Restaurants}
                options={{title:"Restaurantes"}}
            />
            <Stack.Screen 
                name="add-restaurant"
                component={AddRestaurant}
                options={{title:"Añadir resturante"}}
            />
        </Stack.Navigator>
    )
}

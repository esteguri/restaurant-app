import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import AddRestaurantForm from "../../components/restaurants/AddRestaurantForm";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

export default function AddRestaurant({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <AddRestaurantForm
        toastRef={toastRef}
        setShowLoading={setShowLoading}
        navigation={navigation}
      />
      <Loading isVisible={showLoading} text="Creando restaurante" />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
